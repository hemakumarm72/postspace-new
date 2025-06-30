/* eslint-disable @typescript-eslint/no-this-alias */
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';



import { UserDocument } from '../@types';


const userSchema = new mongoose.Schema(
  {
    userId: { type: String },
    userKey: { type: String },
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

userSchema.pre('save', function save(next) {
  const user = this
  try {
    if (!user.isModified('password')) {
      return next()
    }
    const hash = bcrypt.hashSync(user.password as string, 10)
    user.password = hash
    next()
  } catch (err) {
    next(err as Error)
  }
})


export const Users = mongoose.model<
  UserDocument,
  mongoose.PaginateModel<UserDocument>
>('User', userSchema, 'users')