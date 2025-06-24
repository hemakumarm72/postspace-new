// export const linkRegistration = async () => {}
import { NextFunction, Request, Response } from 'express'

import { handleResponse } from '../../../middleware/requestHandle'
import { NewLinkDocument } from '../../../models/@types'
import { fileModel } from '../../../models/file'
import { linkModel } from '../../../models/link'
import { recipientModel } from '../../../models/recipient'
import { uploadModel } from '../../../models/upload'
import { invalidException } from '../../../utils/apiErrorHandler'
import {
  generateHMACKey,
  generateRegistrationLink,
} from '../../../utils/crypto'
import { getCurrentJST } from '../../../utils/day'
import { generatedId } from '../../../utils/randomId'
import * as service from './guest.service'

// export const downloadKLink = async () => {}

// export const getLink = async () => {}

export const createRegistrationLink = async (
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
      isRegistration: true,
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
    const getLinks = await linkModel.getByFieldAndValue('linkId', linkId)

    if (!getLinks) throw invalidException('link is expired', '4019')

    const recipient = await recipientModel.getByFieldAndValue(
      'recipientId',
      getLinks?.recipientId,
    )

    const files = await uploadModel.get({ recipientId: recipient?.recipientId })

    return handleResponse(res, 200, { link: getLinks, recipient, files })
  } catch (error) {
    next(error)
  }
}
