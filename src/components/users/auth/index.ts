import express from 'express';
import { checkSchema } from 'express-validator';



import { isAuth, isUser } from '../../../utils/auth';
import { checkValidation } from '../../../utils/validation';
import * as controller from './auth.controller';
import { EMAIL_VERIFICATION_SCHEMA, GENERATED_WRAPPING_KEY, LOGIN_SCHEMA, OTP_VERIFY_SCHEMA, PIN_UPDATE_SCHEMA, PIN_VERIFY_SCHEMA, REFRESH_TOKEN_SCHEMA, REGISTER_SCHEMA } from './auth.validation';


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

router.put(
  '/pin-update',
  isUser,
  checkSchema(PIN_UPDATE_SCHEMA),
  checkValidation,
  controller.pinUpdate,
)

router.put(
  '/refresh',
  checkSchema(REFRESH_TOKEN_SCHEMA),
  checkValidation,
  controller.refresh,
)

export default router