import { Schema } from 'express-validator'

import { VALIDATION_RECIPIENT_ID } from '../../../constants/validation'

export const CREATE_DEVICE: Schema = {
  recipientId: VALIDATION_RECIPIENT_ID('body'),
}
