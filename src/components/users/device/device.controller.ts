import { NextFunction, Request, Response } from 'express'

import { handleResponse } from '../../../middleware/requestHandle'
import { NewDeviceDocument } from '../../../models/@types'
import { deviceModel } from '../../../models/device'
import { getCurrentJST, getCurrentTime } from '../../../utils/day'

export const registerDevice = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { deviceId, recipientId, senderId } = req.body
    const create: NewDeviceDocument = {
      deviceId,
      recipientId,
      senderId,
      accessedAt: new Date(getCurrentJST()),
    }

    await deviceModel.add(create)

    return handleResponse(res, 200, {})
  } catch (error) {
    next(error)
  }
}

export const deleteDevice = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { deviceId } = req.params

    await deviceModel.deleteOne('deviceId', deviceId)

    return handleResponse(res, 200, {})
  } catch (error) {
    next(error)
  }
}
