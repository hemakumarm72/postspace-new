import { NextFunction, Request, Response } from 'express'

import { Socket } from 'socket.io'

// import { io } from '../middleware/socket'
import { userModel } from '../models/user'
import { invalidException, unauthorizedException } from './apiErrorHandler'
import { isAfterCurrentTime } from './day'
import { setUser } from './helper'
import { decodeJwt } from './jwt'

export const isUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // console.log(req.headers)
    const bearer = req.headers['authorization']
    if (!bearer) throw unauthorizedException('No token provided')

    const token = bearer.split(' ')[1]
    const decoded = decodeJwt(token, 'access')

    const user = await userModel.getByFieldAndValue(
      'userId',
      decoded.payload.id,
    )
    if (!user) throw unauthorizedException('users is not exist')
    // if (user.status == 'suspended')
    //   throw invalidException('account is suspended', '4070')

    req.user = setUser(user)
    next()
  } catch (err) {
    console.warn(err)
    next(err)
  }
}

export const isAuth = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const bearer = req.headers['authorization']
    if (!bearer) throw unauthorizedException('No token provided')

    const token = bearer.split(' ')[1]
    const decoded = decodeJwt(token, 'loginAccess')
    const user = await userModel.getByFieldAndValue(
      'userId',
      decoded.payload.id,
    )
    if (!user) throw unauthorizedException('user is not exist')
    if (
      user.blockUntil &&
      user.attemptFailedCount >= 3 &&
      isAfterCurrentTime(user.blockUntil.toISOString())
    )
      throw invalidException(user.blockUntil.toISOString(), '4069')

    req.user = setUser(user)
    next()
  } catch (error) {
    next(error)
  }
}

// export const userSocketAuth = async (socket: Socket) => {
//   try {
//     const token = socket.handshake.headers.refreshtoken as string
//     const sessionId = socket.handshake.headers.sessionid as string
//     socket.leave(sessionId.toString())
//     socket.join(sessionId)

//     if (!token) return socketErrorHandle(sessionId, 'token is empty', '1019')

//     const decoded = decodeJwtSocket(token, 'refresh', sessionId)
//     if (!decoded) return socketErrorHandle(sessionId, 'jwt wrong', '5000')

//     const user = await userModel.getByFieldAndValue(
//       'userId',
//       decoded.payload.id,
//     )
//     if (!user) return socketErrorHandle(sessionId, 'User is not exist', '1001')

//     if (user.status !== 'suspended')
//       return socketErrorHandle(sessionId, 'This user is suspend', '1007')

//     const userId = user.userId
//     socket.data.userId = userId
//     const online = io.engine.clientsCount
//     console.log(`user Connection online: ${online}`)
//     socket.leave(userId.toString())
//     socket.join(userId.toString())
//     console.log('=========join user ==========')
//     console.log('userId', userId)
//     console.log('=========join user ==========')

//     // userStatusBroadCast(userId, 'online'); // board other user
//     // await updateUserFields(userId, { chatStatus: 'online' });

//     socket.on('disconnect', () => {
//       const offline = io.engine.clientsCount - 1
//       console.log(`user Disconnected : ${offline}`)
//       console.log(`user id : ${socket.data.userId}`)
//       // userStatusBroadCast(userId, 'offline'); // board other user
//       // await updateUserFields(userId, { chatStatus: 'offline' });
//     })
//   } catch (error) {
//     console.log(error)
//   }
// } // user only access socket

export const isMaintainer = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const isMaintenances = process.env.IS_MAINTENANCES
    if (isMaintenances === 'true') {
      throw invalidException('server maintenances', '10000') // TODO: 10000 server maintenances
    }
    next()
  } catch (err) {
    console.warn(err)
    next(err)
  }
}
