import { Schema } from 'express-validator'

import {
  VALIDATION_RECIPIENT_ID,
  VALIDATION_STRING,
} from '../../../constants/validation'

export const CREATE_RECIPIENTS: Schema = {
  name: VALIDATION_STRING('body', 25, '4014'),
}

export const GET_RECIPIENTS_ID: Schema = {
  recipientId: VALIDATION_RECIPIENT_ID('params'),
}

export const UPDATE_RECIPIENTS: Schema = {
  recipientId: VALIDATION_RECIPIENT_ID('params'),
}

export const DELETE_RECIPIENTS: Schema = {
  recipientId: VALIDATION_RECIPIENT_ID('params'),
}
