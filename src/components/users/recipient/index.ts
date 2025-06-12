import express from 'express'
import { checkSchema } from 'express-validator'

import { checkValidation } from '../../../utils/validation'
import * as controller from './recipient.controller'
import {
  CREATE_RECIPIENTS,
  DELETE_RECIPIENTS,
  UPDATE_RECIPIENTS,
} from './recipient.validation'

const router = express.Router()

router.get('/', controller.getRecipients)

router.get('/:recipientId/files', controller.getRecipientFiles)

router.post(
  '/',
  checkSchema(CREATE_RECIPIENTS),
  checkValidation,
  controller.createRecipients,
)

router.put(
  '/:recipientId',
  checkSchema(UPDATE_RECIPIENTS),
  checkValidation,
  controller.updateRecipients,
)

router.delete(
  '/:recipientId',
  checkSchema(DELETE_RECIPIENTS),
  checkValidation,
  controller.deleteRecipients,
)

export default router
