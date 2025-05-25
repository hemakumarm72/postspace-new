import mongoose, { SortOrder, UpdateQuery } from 'mongoose'

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
  email: string
  password: string
  pinSalt: string | null
  pinHash: string | null
  attemptFailedCount: number
  blockUntil: Date | null
  refreshToken: string | null
}

export type UserDocument = NewUserDocument & mongoose.Document

export type UpdateUserDocument = Partial<UserDocument>

export type NewUploadDocument = {
  senderId: string
  recipientId: string
  uploadId: string
  filename: string
  path: string
  filesize: number
  mimeType: string
  uploadKey: Buffer
  iv: Buffer
  tag: Buffer
  isRead: boolean
}

export type UploadDocument = NewUploadDocument & mongoose.Document

export type NewRecipientDocument = {
  senderId: string
  recipientId: string
  filename: string
  path: string
  filesize: number
  mimeType: string
  uploadKey: Buffer
  iv: Buffer
  tag: Buffer
  isRead: boolean
}

export type NewDeviceDocument = {
  deviceId: string
  senderId: string
  recipientId: string
  accessedAt: Date
}

export type DeviceDocument = NewDeviceDocument & mongoose.Document

export type NewFileDocument = {
  uploadId: string
  filename: string
  filesize: number
  s3Path: string
}

export type FileDocument = mongoose.Document & NewFileDocument

export type OtpDocument = mongoose.Document & NewOtpDocument
