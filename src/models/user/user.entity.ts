import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

import { UserDocument } from '../@types'

const userSchema = new mongoose.Schema(
  {
    userId: { type: String },
    email: { type: String },
    password: { type: String },
    pinSalt: { type: String, default: null },
    pinHash: { type: String, default: null },
    refreshToken: { type: String, default: null },
    attemptFailedCount: { type: Number, default: 0 },
    blockUntil: { type: Date, default: null },
  },
  { timestamps: true, versionKey: false },
)

userSchema.plugin(mongoosePaginate)

export const Users = mongoose.model<
  UserDocument,
  mongoose.PaginateModel<UserDocument>
>('User', userSchema, 'users')
