import { Schema } from 'express-validator';



import { VALIDATION_RECIPIENT_ID, VALIDATION_STRING } from '../../../constants/validation';


export const CREATE_REGISTRATION_LINK: Schema = {
  masterKey: VALIDATION_STRING('body', 250, '4014'),
  recipientId: VALIDATION_RECIPIENT_ID('body'),
}