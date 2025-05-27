/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Request } from 'express'

import { NewUserDocument } from '../models/@types'

export const setUser = (user: NewUserDocument) => {
  return {
    userId: user.userId,
    email: user.email,
    userKey: user.userKey,
    password: user.password,
    pinHash: user.pinHash,
    pinSalt: user.pinSalt,
  }
}

export const getMyIp = (req: Request): string =>
  (req.headers['x-real-ip'] as string) ||
  (req.headers['x-forwarded-for'] as string) ||
  (req.socket.remoteAddress as string)

type variableCheck = {
  dataType: 'string' | 'number' | 'date'
}
const isOfType = (value: any, dataType: any) => {
  switch (dataType) {
    case 'string':
      return value ? value : ''
    case 'number':
      return value ? Number(value) : ''
    case 'date':
      return value ? new Date(value) : ''
    default:
      return false
  }
}

export const undefinedRemover = (field: object) => {
  const filteredFilters: any = {}
  Object.entries(field).forEach(([key, value]) => {
    if (value !== undefined && value !== '' && !Number.isNaN(value)) {
      filteredFilters[key] = value
    }
  })
  return filteredFilters
}
