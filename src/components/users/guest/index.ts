import express from 'express'
import { checkSchema } from 'express-validator'

import { checkValidation } from '../../../utils/validation'
import * as controller from './guest.controller'
import { CREATE_LINK } from './guest.validation'

const router = express.Router()

router.get(
  '/link/:linkId/shared/files',
  checkSchema(CREATE_LINK),
  checkValidation,
  controller.getRecipientAndFiles,
)

export default router
