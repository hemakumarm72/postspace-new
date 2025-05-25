import { NextFunction, Request, Response } from 'express'

import { handleResponse } from '../../../middleware/requestHandle'
import { NewUploadDocument } from '../../../models/@types'
import { uploadModel } from '../../../models/upload'
import { generatedId } from '../../../utils/randomId'

export const UploadFile = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { userId } = req.user
    const {
      recipientId,
      filename,
      path,
      filesize,
      mimeType,
      uploadKey,
      iv,
      tag,
      isRead,
    } = req.body
    const createUpload: NewUploadDocument = {
      senderId: userId,
      uploadId: generatedId(),
      recipientId,
      filename,
      path,
      filesize,
      mimeType,
      uploadKey,
      iv,
      tag,
      isRead,
    }

    await uploadModel.add(createUpload)
    return handleResponse(res, 200, {})
  } catch (error) {
    next(error)
  }
}

export const getFileByUploadId = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { uploadId } = req.params

    const result = await uploadModel.getByFieldAndValue('uploadId', uploadId)

    return handleResponse(res, 200, { result })
  } catch (error) {
    next(error)
  }
}

export const deleteUpload = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { uploadId } = req.params
    await uploadModel.deleteOne('uploadId', uploadId)
    return handleResponse(res, 200, {})
  } catch (error) {
    next(error)
  }
}

export const downloadFile = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { userId } = req.user
    const result = await uploadModel.get({ senderId: userId })
    return handleResponse(res, 200, { result })
  } catch (error) {
    next(error)
  }
}
