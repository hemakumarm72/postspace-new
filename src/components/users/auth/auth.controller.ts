import { NextFunction, Request, Response } from 'express'

import { handleResponse } from '../../../middleware/requestHandle'
import {
  NewOtpDocument,
  NewUserDocument,
  UpdateUserDocument,
} from '../../../models/@types'
import { otpModel } from '../../../models/otp'
import { userModel } from '../../../models/user'
import { badImplementationException } from '../../../utils/apiErrorHandler'
import { generateHMACKey, hashPin } from '../../../utils/crypto'
import { getAddToCurrentTime } from '../../../utils/day'
import { encodeJwt } from '../../../utils/jwt'
import {
  generatedId,
  generateUniqueId,
  randomNumber,
} from '../../../utils/randomId'
import { sendMessage } from '../../../utils/sgMailer'
import { MESSAGE_USER_EMAIL_VERIFICATION } from './auth.message'

export const emailVerification = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, locale } = req.body

    const newOtp: NewOtpDocument = {
      otpId: generateUniqueId(),
      userId: null,
      otpType: 'register',
      otp: Number(randomNumber(6, 'numeric')),
      email: email,
      expiredAt: new Date(getAddToCurrentTime(5, 'm')),
    }
    await otpModel.add(newOtp)

    await sendMessage(
      MESSAGE_USER_EMAIL_VERIFICATION(newOtp.email, newOtp.otp, locale),
    )
    return handleResponse(res, 200, {})
  } catch (err) {
    next(err)
  }
}

export const otpVerify = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { otpId } = req.otp
    return handleResponse(res, 200, { result: { otpId } })
  } catch (err) {
    next(err)
  }
}

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email } = req.otp
    const { password } = req.body

    const { ACCESS_TOKEN_EXPIRED_IN, REFRESH_TOKEN_EXPIRED_IN } = process.env
    const userId = generatedId()

    const userRegister: NewUserDocument = {
      userId,
      email,
      password,
      userKey: generateHMACKey(userId, 'userId'),
      pinHash: null,
      pinSalt: null,
      refreshToken: null,
      attemptFailedCount: 0,
      blockUntil: null,
    }

    const accessToken = encodeJwt(
      { id: userRegister.userId },
      ACCESS_TOKEN_EXPIRED_IN || '5m',
      'access',
    )
    const refreshToken = encodeJwt(
      { id: userRegister.userId },
      REFRESH_TOKEN_EXPIRED_IN || '30d',
      'refresh',
    )
    userRegister.refreshToken = refreshToken

    await userModel.add(userRegister)
    return handleResponse(res, 200, {
      accessToken,
      refreshToken,
      isNew: true,
    })
  } catch (error) {
    next(error)
  }
}

export const login = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.user

    const { LOGIN_ACCESS_TOKEN_EXPIRED_IN } = process.env

    const loginToken = encodeJwt(
      { id: userId },
      LOGIN_ACCESS_TOKEN_EXPIRED_IN || '5m',
      'loginAccess',
    )

    return handleResponse(res, 200, { loginToken })
  } catch (error) {
    next(error)
  }
}

export const pinUpdate = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { userId, userKey } = req.user
    const { pin } = req.body

    const { pinHash, pinSalt } = await hashPin(pin)

    const update: UpdateUserDocument = {
      pinHash,
      pinSalt,
    }

    await userModel.update({
      fieldName: 'userId',
      value: userId,
      updateData: update,
    })

    return handleResponse(res, 200, {
      userId,
      userKey: userKey,
    })
  } catch (error) {
    next(error)
  }
}

export const pinVerify = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { userId, userKey } = req.user

    const { ACCESS_TOKEN_EXPIRED_IN, REFRESH_TOKEN_EXPIRED_IN } = process.env

    const update: UpdateUserDocument = {
      attemptFailedCount: 0,
      blockUntil: null,
      refreshToken: null,
    }

    const accessToken = encodeJwt(
      { id: userId },
      ACCESS_TOKEN_EXPIRED_IN || '5m',
      'access',
    )
    const refreshToken = encodeJwt(
      { id: userId },
      REFRESH_TOKEN_EXPIRED_IN || '30d',
      'refresh',
    )
    update.refreshToken = refreshToken

    await userModel.update({
      fieldName: 'userId',
      value: userId,
      updateData: update,
    })

    return handleResponse(res, 200, {
      userId,
      userKey: userKey,
      accessToken,
      refreshToken,
      isNew: false,
    })
  } catch (error) {
    next(error)
  }
}

export const pinReset = async () => {}

export const refresh = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { userId } = req.user
    if (!userId)
      throw badImplementationException(
        'authorization process has something wrong.',
      )
    const { ACCESS_TOKEN_EXPIRED_IN, REFRESH_TOKEN_EXPIRED_IN } = process.env

    const browserToken = generatedId()
    const accessToken = encodeJwt(
      { id: userId, browserToken },
      ACCESS_TOKEN_EXPIRED_IN || '5m',
      'access',
    )
    const refreshToken = encodeJwt(
      { id: userId, browserToken },
      REFRESH_TOKEN_EXPIRED_IN || '30d',
      'refresh',
    )

    await userModel.update({
      fieldName: 'userId',
      value: userId,
      updateData: { refreshToken },
    })
    return handleResponse(res, 200, { accessToken, refreshToken })
  } catch (err: any) {
    next(err)
  }
}
