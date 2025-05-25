import express, { NextFunction, Request, Response } from 'express'

import cors from 'cors'
// import logger from 'morgan';
import multer from 'multer'
import path from 'path'

import { badImplementationException } from '.././utils/apiErrorHandler'
import { errorRequestLogger, requestLogger } from '../utils/logger'
import { connectMongo } from './mongo'

export const config = async (app: express.Application) => {
  app.use(requestLogger)
  app.use(errorRequestLogger)
  app.use(cors())
  app.use(express.json())
  app.use(express.urlencoded({ extended: false }))
  app.use((error: any, req: Request, res: Response, next: NextFunction) => {
    // multerFunction
    if (error instanceof multer.MulterError) {
      if (error.message === 'LIMIT_FILE_SIZE') {
        return badImplementationException('File is large, upload 2MB below')
      }
      if (error.message === 'LIMIT_UNEXPECTED_FILE') {
        return badImplementationException('File must be an image JPEG and PNG')
      }
    } else if (error instanceof Error) {
      // An unknown error occurred when uploading.
      if (error.message === 'LIMIT_FILE_SIZE') {
        return badImplementationException('File is large, upload 2MB below')
      }
      if (error.message === 'LIMIT_UNEXPECTED_FILE') {
        return badImplementationException('File must be an image JPEG and PNG')
      }
    }
  })
  app
    .get('/', (req, res) => {
      res.sendFile(path.join(__dirname, '../../public/index.html'))
    })
    .get('/health', (req, res) => {
      return res.status(200).send()
    })

  await connectMongo()
}
