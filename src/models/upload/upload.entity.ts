import mongoose, { Schema } from 'mongoose'

import { UploadDocument } from '../@types'

const uploadSchema = new Schema(
  {
    senderId: { type: String },
    recipientId: {
      type: String,
    },
    filename: { type: String, required: true },
    path: { type: String, required: true },
    filesize: { type: Number },
    mimeType: { type: String, required: true },
    uploadKey: { type: Buffer }, // 16 B salt
    iv: { type: Buffer }, // 12 bytes
    tag: { type: Buffer }, // 16 bytes
    isRead: { type: Boolean, default: false },
  },
  { versionKey: false, timestamps: true },
)

export const Uploads = mongoose.model<
  UploadDocument,
  mongoose.PaginateModel<UploadDocument>
>('Upload', uploadSchema, 'uploads')
