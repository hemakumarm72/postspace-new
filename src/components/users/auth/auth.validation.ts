import { Schema } from 'express-validator'

import {
  VALIDATION_EMAIL_EXIST,
  VALIDATION_EMAIL_REGISTER_CHECK,
  VALIDATION_OTP_CODE,
  VALIDATION_PASSWORD,
  VALIDATION_PASSWORD_CHECK,
  VALIDATION_STRING,
  VALIDATION_VERIFY_PIN,
} from '../../../constants/validation'

export const PIN_VERIFY_SCHEMA: Schema = {
  pin: VALIDATION_VERIFY_PIN('body'),
}

export const LOGIN_SCHEMA: Schema = {
  email: VALIDATION_EMAIL_EXIST('body'),
  password: VALIDATION_PASSWORD_CHECK('body'),
}

export const EMAIL_VERIFICATION_SCHEMA: Schema = {
  email: VALIDATION_EMAIL_REGISTER_CHECK('body'),
}

export const OTP_VERIFY_SCHEMA: Schema = {
  otp: VALIDATION_OTP_CODE('body', 'otp'),
}

export const REGISTER_SCHEMA: Schema = {
  otpId: VALIDATION_OTP_CODE('body', 'otpId'),
  fullName: VALIDATION_STRING('body', 20, '4011'),
  password: VALIDATION_PASSWORD('body'),
}
