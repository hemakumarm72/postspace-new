import { Schema } from 'express-validator'

import { VALIDATION_LINK_ID } from '../../../constants/validation'

export const CREATE_LINK: Schema = {
  linkId: VALIDATION_LINK_ID('params'),
}
