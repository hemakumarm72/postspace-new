import { Schema } from 'express-validator'

import {
  VALIDATION_LINK,
  VALIDATION_LINK_ID,
  VALIDATION_RECIPIENT_ID,
  VALIDATION_UPLOAD_ID,
} from '../../../constants/validation'

export const CREATE_REGISTRATION_LINK: Schema = {
  recipientId: VALIDATION_RECIPIENT_ID('body'),
}

export const CREATE_LINK: Schema = {
  linkId: VALIDATION_LINK_ID('params'),
}

export const LINK_VALIDATION: Schema = {
  linkId: VALIDATION_LINK('params'),
}

export const CREATE_FILE_LINK: Schema = {
  recipientId: VALIDATION_RECIPIENT_ID('body'),
  uploadId: VALIDATION_UPLOAD_ID('body'),
}
