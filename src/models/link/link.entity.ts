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
    recipientId: { type: String },
    iv: { type: Buffer }, // 12 bytes
    tag: { type: Buffer }, // 16 bytes
    isRegistration: { type: Boolean, default: false },
    accessedAt: { type: Date },
  },
  { versionKey: false, timestamps: true },
)

export const Links = mongoose.model<
  LinkDocument,
  mongoose.PaginateModel<LinkDocument>
>('Link', linkSchema, 'links')
