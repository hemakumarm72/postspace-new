// export const linkRegistration = async () => {}
import { NextFunction, Request, Response } from 'express'

import { handleResponse } from '../../../middleware/requestHandle'
import { NewLinkDocument } from '../../../models/@types'
import {
  generateHMACKey,
  generateRegistrationLink,
} from '../../../utils/crypto'
import { getCurrentJST } from '../../../utils/day'
import { generatedId } from '../../../utils/randomId'
import * as service from './link.service'

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

// exports.createDownloadLink = async (senderId, recipientId, uploadId) => {
//   // is_registration=false, iv/tag not required
//   const link = new Link({
//     sender_id: senderId,
//     recipient_id: recipientId,
//     upload_id: uploadId,
//     is_registration: false,
//   })
//   return link.save()
// }
