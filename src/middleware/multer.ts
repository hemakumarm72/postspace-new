import { Request } from 'express'

import multer, { MulterError } from 'multer'

const imageFileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback,
) => {
  if (file.mimetype.split('/')[0] === 'image') {
    cb(null, true)
  } else {
    cb(new Error('LIMIT_UNEXPECTED_FILE'))
  }
}

const pdfFileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback,
) => {
  if (file.mimetype.split('/')[0] === 'pdf') {
    cb(null, true)
  } else {
    cb(new Error('LIMIT_UNEXPECTED_FILE'))
  }
}

const storage = multer.memoryStorage()
//TODO: Multer setup size
const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 2, // 2 MB limit
  },
  fileFilter: imageFileFilter, // Use fileFilter instead of imageFileFilter
})

const uploadPdf = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 10, // 10 MB limit
  },
  fileFilter: pdfFileFilter, // Use fileFilter instead of pdFfileFilter
})

export { upload, uploadPdf }
