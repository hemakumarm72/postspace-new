import mongoose, { Schema } from 'mongoose'

import { FileDocument } from '../@types'

const linkSchema = new Schema(
  {
    senderId: { type: String },
    uploadId: {
      type: String,
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

export const Files = mongoose.model<
  FileDocument,
  mongoose.PaginateModel<FileDocument>
>('Link', linkSchema, 'links')
