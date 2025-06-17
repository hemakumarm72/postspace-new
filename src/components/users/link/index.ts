import express from 'express';
import { checkSchema } from 'express-validator';



import { checkValidation } from '../../../utils/validation';
import * as controller from './link.controller';
import { CREATE_LINK, CREATE_REGISTRATION_LINK } from './link.validation';


const router = express.Router()

router.post(
  '/generated',
  checkSchema(CREATE_REGISTRATION_LINK),
  checkValidation,
  controller.createRegistrationLink,
)

router.get(
  '/:linkId/shared/files',
  checkSchema(CREATE_LINK),
  checkValidation,
  controller.getRecipientAndFiles,
)
export default router