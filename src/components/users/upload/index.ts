import express from 'express'
import { checkSchema } from 'express-validator'

import { isUser } from '../../../utils/auth'
import { checkValidation } from '../../../utils/validation'
import * as controller from './upload.controller'
import { UPLOAD_SCHEMA } from './upload.validation'

const router = express.Router()

router.get(
  '/generatedUploadId',
  isUser,
  checkValidation,
  controller.generatedUploadId,
)

router.post(
  '/',
  isUser,
  checkSchema(UPLOAD_SCHEMA),
  checkValidation,
  controller.UploadFile,
)

router.put('/status', checkValidation, controller.updateFileStatus)

router.delete('/', isUser, checkValidation, controller.deleteFiles)

// TODO: delete file using uploadId

export default router
