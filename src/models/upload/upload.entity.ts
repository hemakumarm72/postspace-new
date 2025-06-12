import mongoose, { Schema } from 'mongoose';



import { UploadDocument } from '../@types';


const uploadSchema = new Schema(
  {
    uploadId: { type: String },
    senderId: { type: String },
    recipientId: {
      type: String,
    },
    filename: { type: String },
    path: { type: String },
    filesize: { type: Number },
    mimeType: { type: String },
    uploadKey: { type: String }, // 16 B salt
    // iv: { type: Buffer }, // 12 bytes
    // tag: { type: Buffer }, // 16 bytes
    isRead: { type: Boolean, default: false },
  },
  { versionKey: false, timestamps: true },
)

export const Uploads = mongoose.model<
  UploadDocument,
  mongoose.PaginateModel<UploadDocument>
>('Upload', uploadSchema, 'uploads')