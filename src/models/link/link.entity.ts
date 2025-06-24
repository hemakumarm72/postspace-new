import mongoose, { Schema } from 'mongoose'

import { LinkDocument } from '../@types'

const linkSchema = new Schema(
  {
    linkId: { type: String },
    senderId: { type: String },
    uploadId: {
      type: String,
      default: null,
    },
    linkKey: { type: String },
    isGuest: { type: Boolean, default: false },
    guestKey: { type: String },
    recipientId: { type: String },
    isRegistration: { type: Boolean, default: false },
    accessedAt: { type: Date },
  },
  { versionKey: false, timestamps: true },
)

export const Links = mongoose.model<
  LinkDocument,
  mongoose.PaginateModel<LinkDocument>
>('Link', linkSchema, 'links')
