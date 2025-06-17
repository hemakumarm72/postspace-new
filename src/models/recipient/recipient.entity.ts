import mongoose, { Schema } from 'mongoose'

import { RecipientDocument } from '../@types'

const recipientSchema = new Schema(
  {
    recipientId: { type: String },
    userId: { type: String },
    name: {
      type: String,
      required: true,
    },
    email: { type: String, default: null },
    isPaused: { type: Boolean, default: false },
  },
  { versionKey: false, timestamps: true },
)

export const Recipients = mongoose.model<
  RecipientDocument,
  mongoose.PaginateModel<RecipientDocument>
>('Recipient', recipientSchema, 'recipients')
