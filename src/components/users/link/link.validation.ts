import { Schema } from 'express-validator'

import {
  VALIDATION_LINK_ID,
  VALIDATION_RECIPIENT_ID,
} from '../../../constants/validation'

export const CREATE_REGISTRATION_LINK: Schema = {
  recipientId: VALIDATION_RECIPIENT_ID('body'),
}

export const CREATE_LINK: Schema = {
  linkId: VALIDATION_LINK_ID('params'),
}
