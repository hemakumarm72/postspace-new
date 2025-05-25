import mongoose from 'mongoose'

import { OtpDocument } from '../@types/index'

const otpSchema = new mongoose.Schema(
  {
    otpId: { type: String },
    userId: { type: String, default: null },
    email: { type: String },
    otp: { type: Number },
    otpType: {
      type: String,
      enum: ['forgot', 'register'],
      default: 'register',
    },
    expiredAt: { type: Date },
  },
  { timestamps: true },
)

otpSchema.index({ expiredAt: 1 }, { expireAfterSeconds: 0 }) //TODO: auto delete otp certain time

export const Otp = mongoose.model<OtpDocument>('otp', otpSchema, 'otp')
