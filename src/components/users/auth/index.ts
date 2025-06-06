import express from 'express'
import { checkSchema } from 'express-validator'

import { isAuth } from '../../../utils/auth'
import { checkValidation } from '../../../utils/validation'
import * as controller from './auth.controller'
import {
  EMAIL_VERIFICATION_SCHEMA,
  LOGIN_SCHEMA,
  OTP_VERIFY_SCHEMA,
  PIN_VERIFY_SCHEMA,
  REGISTER_SCHEMA,
} from './auth.validation'

const router = express.Router()

router.post(
  '/requestEmailVerification',
  checkSchema(EMAIL_VERIFICATION_SCHEMA),
  checkValidation,
  controller.emailVerification,
)

router.put(
  '/verifyOtp',
  checkSchema(OTP_VERIFY_SCHEMA),
  checkValidation,
  controller.otpVerify,
)

router.post(
  '/register',
  checkSchema(REGISTER_SCHEMA),
  checkValidation,
  controller.register,
)

router.put(
  '/login',
  checkSchema(LOGIN_SCHEMA),
  checkValidation,
  controller.login,
)

router.put(
  '/pin-verify',
  isAuth,
  checkSchema(PIN_VERIFY_SCHEMA),
  checkValidation,
  controller.pinVerify,
)

export default router
