import { NextFunction, Request, Response } from 'express'

import { handleResponse } from '../../../middleware/requestHandle'
import { NewDeviceDocument } from '../../../models/@types'
import { deviceModel } from '../../../models/device'
import { invalidException } from '../../../utils/apiErrorHandler'
import { generateHMACKey } from '../../../utils/crypto'
import { getCurrentJST, getCurrentTime } from '../../../utils/day'
import { generatedId } from '../../../utils/randomId'

export const registerDevice = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { recipientId } = req.body

    const { userId } = req.user

    const deviceId = generatedId()

    const devices = await deviceModel.getOne({ recipientId })

    if (!devices) {
      const create: NewDeviceDocument = {
        deviceId,
        deviceKey: generateHMACKey(deviceId, 'deviceId'),
        recipientId,
        senderId: userId,
        accessedAt: new Date(getCurrentJST()),
      }

      await deviceModel.add(create)

      return handleResponse(res, 200, {
        deviceId,
        deviceKey: create.deviceKey,
        isNew: true,
      })
    }

    
    if (devices?.senderId !== userId) {
      throw invalidException('device already register', '4030')
    }

    if (devices) {
      return handleResponse(res, 200, {
        deviceId: devices.deviceId,
        deviceKey: devices.deviceKey,
        isNew: false,
      })
    }
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
