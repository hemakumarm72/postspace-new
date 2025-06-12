import mongoose, { Schema } from 'mongoose'

import { FileDocument } from '../@types'

const fileSchema = new Schema(
  {
    uploadId: { type: String },
    fileKey: { type: String },
  },
  { versionKey: false, timestamps: true },
)

export const Files = mongoose.model<
  FileDocument,
  mongoose.PaginateModel<FileDocument>
>('File', fileSchema, 'files')
