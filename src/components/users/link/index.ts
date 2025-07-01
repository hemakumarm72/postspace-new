import express from 'express'
import { checkSchema } from 'express-validator'

import { checkValidation } from '../../../utils/validation'
import * as controller from './link.controller'
import {
  CREATE_FILE_LINK,
  CREATE_REGISTRATION_LINK,
  LINK_VALIDATION,
} from './link.validation'

const router = express.Router()

router.post(
  '/recipient/generated',
  checkSchema(CREATE_REGISTRATION_LINK),
  checkValidation,
  controller.createRecipientLink,
)

router.post(
  '/file/generated',
  checkSchema(CREATE_FILE_LINK),
  checkValidation,
  controller.createFileLink,
)
router.get(
  '/:linkId/shared/files',
  checkSchema(LINK_VALIDATION),
  checkValidation,
  controller.getRecipientAndFiles,
)

export default router
