import mongoose, { Schema } from 'mongoose'

import { DeviceDocument } from '../@types'

const DeviceSchema = new Schema(
  {
    deviceId: { type: String },
    senderId: { type: String },
    recipientId: {
      type: String,
    },
    accessedAt: { type: Date },
  },
  { versionKey: false, timestamps: true },
)

export const Devices = mongoose.model<
  DeviceDocument,
  mongoose.PaginateModel<DeviceDocument>
>('Device', DeviceSchema, 'devices')
