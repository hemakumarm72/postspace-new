import express from 'express';
import { checkSchema } from 'express-validator';



import { checkValidation } from '../../../utils/validation';
import * as controller from './device.controller';
import { CHECK_DEVICE, CREATE_DEVICE } from './device.validation';


const router = express.Router()

router.post(
  '/',
  checkSchema(CREATE_DEVICE),
  checkValidation,
  controller.registerDevice,
)


export default router