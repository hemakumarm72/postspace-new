// export const linkRegistration = async () => {}
import { NextFunction, Request, Response } from 'express';



import { handleResponse } from '../../../middleware/requestHandle';
import { NewLinkDocument } from '../../../models/@types';
import { deviceModel } from '../../../models/device';
import { fileModel } from '../../../models/file';
import { linkModel } from '../../../models/link';
import { recipientModel } from '../../../models/recipient';
import { uploadModel } from '../../../models/upload';
import { invalidException } from '../../../utils/apiErrorHandler';
import { generateHMACKey, generateRegistrationLink } from '../../../utils/crypto';
import { getCurrentJST } from '../../../utils/day';
import { generatedId } from '../../../utils/randomId';
import * as service from './link.service';


// export const downloadKLink = async () => {}

// export const getLink = async () => {}

export const createRecipientLink = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { userId } = req.user
    const { recipientId } = req.body

    const isExiting = await linkModel.getByFieldAndValue(
      'recipientId',
      recipientId,
    )

    if (isExiting)
      return handleResponse(res, 200, {
        linkId: isExiting.linkId,
        linkKey: isExiting.linkKey,
      })

    const linkId = generatedId()

    const create: NewLinkDocument = {
      linkId: linkId,
      senderId: userId,
      uploadId: null,
      linkKey: generateHMACKey(linkId, 'linkId'),
      recipientId: recipientId,
      isRegistration: false,
      accessedAt: new Date(getCurrentJST()),
    }

    await service.createRegistrationLink(create)

    return handleResponse(res, 200, {
      linkId: create.linkId,
      linkKey: create.linkKey,
    })
  } catch (error) {
    next(error)
  }
}

export const createFileLink = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { userId } = req.user
    const { recipientId, uploadId } = req.body

    const isExiting = await linkModel.getOne({ recipientId, uploadId })

    if (isExiting)
      return handleResponse(res, 200, {
        linkId: isExiting.linkId,
        linkKey: isExiting.linkKey,
      })

    const linkId = generatedId()

    const create: NewLinkDocument = {
      linkId: linkId,
      senderId: userId,
      uploadId: uploadId,
      linkKey: generateHMACKey(linkId, 'linkId'),
      recipientId: recipientId,
      isRegistration: false,
      accessedAt: new Date(getCurrentJST()),
    }

    await service.createRegistrationLink(create)

    return handleResponse(res, 200, {
      linkId: create.linkId,
      linkKey: create.linkKey,
    })
  } catch (error) {
    next(error)
  }
}

export const getRecipientAndFiles = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { linkId } = req.params
    const { link, recipient, files } = req

    await linkModel.update({
      fieldName: 'linkId',
      value: linkId,
      updateData: { $set: { isRegistration: true } }, // TODO: link registration
    })

    return handleResponse(res, 200, { link, recipient, files })
  } catch (error) {
    next(error)
  }
}

export const regeneratedRecipientLink = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { userId } = req.user
    const { recipientId } = req.body

    await linkModel.deleteMany('recipientId', recipientId) // link delete
    await deviceModel.deleteMany('recipientId', recipientId) // device delete

    const linkId = generatedId()

    const create: NewLinkDocument = {
      linkId: linkId,
      senderId: userId,
      uploadId: null,
      linkKey: generateHMACKey(linkId, 'linkId'),
      recipientId: recipientId,
      isRegistration: false,
      accessedAt: new Date(getCurrentJST()),
    }

    await service.createRegistrationLink(create)

    return handleResponse(res, 200, {
      linkId: create.linkId,
      linkKey: create.linkKey,
    })
  } catch (error) {
    next(error)
  }
}

export const checkRegisterLink = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { linkId } = req.params
    const link = await linkModel.getOne({ linkId })

    if (!link) throw invalidException('link is not found', '4018')

    if (link.uploadId) {
      const device = await deviceModel.getByFieldAndValue(
        'recipientId',
        link.recipientId,
      )
      if (!device) throw invalidException('device is not found', '4020')
    }
    return handleResponse(res, 200, { isRegistration: link.isRegistration })
  } catch (error) {
    next(error)
  }
}