import jwt, { JwtPayload } from 'jsonwebtoken'

import {
  badImplementationException,
  unauthorizedException,
} from './apiErrorHandler'

export const encodeJwt = (
  payload: string | Record<string, unknown> | Buffer,
  expiresIn: string | number,
  secret: 'refresh' | 'access' | 'loginAccess' | 'default' = 'default',
) => {
  try {
    const SECRET =
      secret === 'refresh'
        ? process.env.JWT_REFRESH_SECRET
        : secret === 'access'
        ? process.env.JWT_ACCESS_SECRET
        : secret === 'loginAccess'
        ? process.env.LOGIN_TOKEN_SECRET
        : process.env.JWT_SECRET

    if (!SECRET)
      throw badImplementationException('SECRET is not defined on env file')
    const jwtToken = jwt.sign({ payload }, SECRET, { expiresIn })
    return jwtToken
  } catch (err) {
    throw unauthorizedException('Error encoding JWT')
  }
}

export const decodeJwt = (
  jwtToken: string,
  secret: 'refresh' | 'access' | 'loginAccess' | 'default' = 'default',
) => {
  try {
    const SECRET =
      secret === 'refresh'
        ? process.env.JWT_REFRESH_SECRET
        : secret === 'access'
        ? process.env.JWT_ACCESS_SECRET
        : secret === 'loginAccess'
        ? process.env.LOGIN_TOKEN_SECRET
        : process.env.JWT_SECRET
    if (!SECRET)
      throw badImplementationException('SECRET is not defined on env file')

    const decode = jwt.verify(jwtToken, SECRET)
    if (typeof decode === 'string')
      throw unauthorizedException('JWT token is invalid')

    return decode
  } catch (err) {
    throw unauthorizedException('JWT is not valid')
  }
}

// export const decodeJwtSocket = (
//   jwToken: string,
//   secret: 'refresh' | 'access' | 'default' = 'default',
//   sessionId: string,
// ): JwtPayload => {
//   try {
//     const SECRET =
//       secret === 'refresh'
//         ? process.env.JWT_REFRESH_SECRET
//         : secret === 'access'
//         ? process.env.JWT_ACCESS_SECRET
//         : process.env.JWT_SECRET
//     if (!SECRET)
//       throw socketErrorHandle(
//         sessionId,
//         'SECRET is not defined on env file',
//         '5000',
//       )

//     const decode = jwt.verify(jwToken, SECRET)
//     if (typeof decode === 'string')
//       throw socketErrorHandle(sessionId, 'JWT token is invalid', '2001')
//     return decode
//   } catch (err: any) {
//     throw socketErrorHandle(sessionId, 'JWT is not valid', '5000')
//   }
// }
