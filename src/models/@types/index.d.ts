import mongoose, { SortOrder, UpdateQuery } from 'mongoose'
import { StringifyOptions } from 'querystring'

export type UpdateType<T> = {
  fieldName: keyof T
  value: string
  updateData: UpdateQuery<T>
}

export type comparePasswordFunction = (
  candidatePassword: string,
  cb: (err: any, isMatch: boolean) => void,
) => void

export type NewOtpDocument = {
  otpId: string
  userId: string | null
  email: string
  otp: number
  otpType: 'forgot' | 'register'
  expiredAt: Date
}

export type NewUserDocument = {
  userId: string
  email: string | null
  password: string
  userKey: string
  pinSalt: string | null
  pinHash: string | null
  isGuest: boolean
  attemptFailedCount: number
  blockUntil: Date | null
  refreshToken: string | null
}

export type UserDocument = NewUserDocument & mongoose.Document

export type UpdateUserDocument = Partial<UserDocument>

export type NewUploadDocument = {
  uploadId: string | null
  senderId: string
  recipientId: string
  filename: string
  path: string
  filesize: number
  mimeType: string
  uploadKey: string
  isRead: boolean
}

export type UploadDocument = NewUploadDocument & mongoose.Document

export type NewRecipientDocument = {
  recipientId: string
  userId: string
  name: string
  email: string | null
  isPaused: boolean
}

export type RecipientDocument = NewRecipientDocument & mongoose.Document

export type NewDeviceDocument = {
  deviceId: string
  senderId: string
  deviceKey: string
  recipientId: string
  accessedAt: Date
}

export type DeviceDocument = NewDeviceDocument & mongoose.Document

export type NewFileDocument = {
  uploadId: string
  fileKey: string
}

export type FileDocument = mongoose.Document & NewFileDocument

export type OtpDocument = mongoose.Document & NewOtpDocument

export type NewLinkDocument = {
  linkId: string
  senderId: string
  uploadId: string | null
  linkKey: string
  recipientId: string
  isRegistration: boolean
  accessedAt: Date
}

export type UpdateLinkDocument = Partial<NewLinkDocument>

export type LinkDocument = mongoose.Document & NewLinkDocument
