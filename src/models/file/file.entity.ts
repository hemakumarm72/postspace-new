import mongoose, { Schema } from 'mongoose'

import { FileDocument } from '../@types'

const fileSchema = new Schema(
  {
    uploadId: { type: String },
    fileKey: { type: String },
    filename: {
      type: String,
    },
    filesize: { type: Number },
    s3Path: { type: String },
  },
  { versionKey: false, timestamps: true },
)

export const Files = mongoose.model<
  FileDocument,
  mongoose.PaginateModel<FileDocument>
>('File', fileSchema, 'files')
