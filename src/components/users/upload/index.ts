import express from 'express'
import { checkSchema } from 'express-validator'

import { checkValidation } from '../../../utils/validation'
import * as controller from './upload.controller'
import { UPLOAD_SCHEMA } from './upload.validation'

const router = express.Router()

router.get('/generatedUploadId', checkValidation, controller.generatedUploadId)

router.post(
  '/',
  checkSchema(UPLOAD_SCHEMA),
  checkValidation,
  controller.UploadFile,
)

router.put('/status', checkValidation, controller.updateFileStatus)

router.delete('/', checkValidation, controller.deleteFiles)

// TODO: delete file using uploadId

export default router
