import { Schema } from 'express-validator'

import {
  VALIDATION_DEVICE_ID,
  VALIDATION_RECIPIENT_ID,
} from '../../../constants/validation'

export const CREATE_DEVICE: Schema = {
  recipientId: VALIDATION_RECIPIENT_ID('body'),
}

export const CHECK_DEVICE: Schema = {
  deviceId: VALIDATION_DEVICE_ID('params'),
}
