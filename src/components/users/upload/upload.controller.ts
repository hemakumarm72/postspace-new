import { NextFunction, Request, Response } from 'express';



import { handleResponse } from '../../../middleware/requestHandle';
import { NewUploadDocument } from '../../../models/@types';
import { fileModel } from '../../../models/file';
import { uploadModel } from '../../../models/upload';
import { generateHMACKey } from '../../../utils/crypto';
import { generatedId } from '../../../utils/randomId';


type UploadFile = {
  uploadId: string
  recipientId: string
  filename: string
  path: string
  filesize: number
  mimeType: string
  uploadKey: string
  fileKey: string
}

export const UploadFile = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { userId } = req.user
    const { files } = req.body

    const createUploads: NewUploadDocument[] = files.map((v: UploadFile) => ({
      uploadId: v.uploadId,
      senderId: userId,
      recipientId: v.recipientId,
      filename: v.filename,
      path: v.path,
      filesize: v.filesize,
      mimeType: v.mimeType,
      fileKey: v.fileKey,
      uploadKey: v.uploadKey,
      isRead: false,
    }))

    await uploadModel.multiAdd(createUploads)
    await fileModel.multiAdd(createUploads)

    return handleResponse(res, 200, {})
  } catch (error) {
    next(error)
  }
}

export const generatedUploadId = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const uploadId = generatedId()
    const uploadKey = generateHMACKey(uploadId, 'uploadId')

    return handleResponse(res, 200, { uploadId, uploadKey })
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

export const deleteFiles = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { uploadId } = req.body

    await uploadModel.deleteManyIds('uploadId', uploadId)

    return handleResponse(res, 200, {})
  } catch (error) {
    next(error)
  }
}