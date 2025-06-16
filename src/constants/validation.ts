import { Location, ParamSchema } from 'express-validator'

import { UpdateType, UserDocument } from '../models/@types'
import { otpModel } from '../models/otp'
import { recipientModel } from '../models/recipient'
import { userModel } from '../models/user'
import { comparePass } from '../utils/bcrypt'
import { hashVerify } from '../utils/crypto'
import { getAddToCurrentTime } from '../utils/day'
import { setUser } from '../utils/helper'
import { decodeJwt } from '../utils/jwt'
import { REGEXP_PASSWORD } from '../utils/regexp'
import {
  EMAIL_MAX_LENGTH,
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
} from './length'

export const VALIDATION_LOCALE = (where: Location): ParamSchema => ({
  in: [where],
  isString: { errorMessage: '4005 ' },
  optional: {
    options: { nullable: true },
  },

  errorMessage: '4005 ', // TODO: invalid email format
  custom: {
    options: (value, { req, location, path }) => {
      const locales = ['en', 'ja']
      if (!locales.includes(value)) throw new Error('4005')
      return true
    },
  },
})

export const VALIDATION_PASSWORD_CHECK = (where: Location): ParamSchema => ({
  in: [where],
  isString: true,
  matches: {
    options: REGEXP_PASSWORD,
  },
  isLength: {
    options: { min: PASSWORD_MIN_LENGTH, max: PASSWORD_MAX_LENGTH },
  },
  custom: {
    options: (value, { req, location, path }) => {
      const user = req.user
      if (!user) throw new Error('4002')

      const isMatch = comparePass(value, user.password)
      if (!isMatch) {
        throw new Error('4004')
      }

      req.user = setUser(user)

      return true
    },
  },
})

export const VALIDATION_PASSWORD = (where: Location): ParamSchema => ({
  in: [where],
  isString: true,
  matches: {
    options: REGEXP_PASSWORD,
  },
  isLength: {
    options: { min: PASSWORD_MIN_LENGTH, max: PASSWORD_MAX_LENGTH },
  },
  errorMessage: '4003',
})

/**
 * VALIDATION_STRING.
 * @param {Location} where
 * @param {number} length
 * @param {string} subStatusCode
 * @param {'optional'} checkBy
 *  @return {any}
 */

export const VALIDATION_STRING = (
  where: Location,
  length: number,
  subStatusCode: string,
  checkBy?: 'optional',
): ParamSchema => ({
  in: [where],
  isString: checkBy === 'optional' ? false : { errorMessage: subStatusCode },
  notEmpty: checkBy === 'optional' ? false : true,
  isLength: { options: { min: 2, max: length } },
  errorMessage: subStatusCode,
})

export const VALIDATION_ARRAY = (
  where: Location,
  subStatusCode: string,
  checkBy?: 'optional',
): ParamSchema => ({
  in: [where],
  isArray: checkBy === 'optional' ? false : { errorMessage: subStatusCode },
  notEmpty: checkBy !== 'optional' ? true : false,
})

export const VALIDATION_DATE = (
  where: Location,
  checkBy?: 'optional',
): ParamSchema => ({
  in: [where],
  isDate: checkBy === 'optional' ? false : true,
  notEmpty: checkBy === 'optional' ? false : true,
})

export const VALIDATION_STRING_LENGTH = (
  where: Location,
  Length: number,
  checkBy?: 'optional',
): ParamSchema => ({
  in: [where],
  isString: checkBy !== 'optional' ? true : false,
  notEmpty: checkBy !== 'optional' ? true : false,
  custom: {
    options: (value: string, { req, location, path }) => {
      value = value.replace(/\s/g, '') // remove whitespace in text
      if (value.length > Length) throw new Error('1045') // TODO: STRING NOT CONTAIN MIN 150 CHARACTERS

      return true
    },
  },
})
export const VALIDATION_USER_REFRESH_TOKEN = (
  where: Location,
): ParamSchema => ({
  in: [where],
  isString: true,
  notEmpty: true,
  custom: {
    options: async (value, { req, location, path }) => {
      const decoded = decodeJwt(value, 'refresh')
      const user = await userModel.getByFieldAndValue(
        'userId',
        decoded.payload.id,
      )
      if (!user) throw new Error('1002')
      if (user.refreshToken !== value) throw new Error('1008') // TODO: 1008 REFRESH NOT match

      req.user = setUser(user)

      return true
    },
  },
})

export const VALIDATION_NUMBER = (
  where: Location,
  subStatusCode: string = '4014',
  checkBy?: 'optional',
): ParamSchema => ({
  in: [where],
  isNumeric: checkBy === 'optional' ? false : { errorMessage: subStatusCode },
  notEmpty: checkBy !== 'optional' ? true : false,
})

export const VALIDATION_BOOLEAN = (
  where: Location,
  subStatusCode: string,
  checkBy?: 'optional',
): ParamSchema => ({
  in: [where],
  isBoolean: checkBy === 'optional' ? false : { errorMessage: subStatusCode },
  notEmpty: checkBy !== 'optional' ? true : false,
})

export const VALIDATION_NON_EMPTY_ARRAY = (where: Location): ParamSchema => ({
  in: [where],
  isArray: true,
  notEmpty: true,
})

export const VALIDATION_VERIFY_PIN = (where: Location): ParamSchema => ({
  in: [where],
  isString: true,
  notEmpty: true,
  custom: {
    options: async (value, { req, location, path }) => {
      const user = req.user as UserDocument
      console.log(user)
      if (!user.pinHash) throw Error('4001')
      const isVerify = await hashVerify(user.pinHash, value)

      if (!isVerify) {
        const update: UpdateType<UserDocument> = {
          fieldName: 'userId',
          value: user.userId,
          updateData: {
            $inc: { attemptFailedCount: 1 },
            $set: { blockUntil: new Date(getAddToCurrentTime(1, 'h')) },
          },
        }

        await userModel.update(update)

        throw Error('4002')
      }

      return
    },
  },
})

export const VALIDATION_EMAIL_EXIST = (where: Location): ParamSchema => ({
  in: [where],
  isEmail: true,
  optional: {
    options: { nullable: true },
  },
  isLength: {
    options: { max: EMAIL_MAX_LENGTH },
  },
  custom: {
    options: async (value, { req, location, path }) => {
      const user = await userModel.getByFieldAndValue('email', value)
      if (!user) throw new Error('1002')
      req.user = setUser(user)
      return true
    },
  },
})

export const VALIDATION_EMAIL_REGISTER_CHECK = (
  where: Location,
): ParamSchema => ({
  in: [where],
  isEmail: { errorMessage: '4000' },
  optional: {
    options: { nullable: true },
  },
  isLength: {
    options: { max: EMAIL_MAX_LENGTH },
  },
  errorMessage: '4000', // TODO: invalid email format
  custom: {
    options: async (value, { req, location, path }) => {
      const user = await userModel.getByFieldAndValue('email', value)
      if (user) throw new Error('4001') //TODO: if user already used email throw error
      const otpCheck = await otpModel.getByFieldAndValue('email', value)
      if (!otpCheck) return true
      if (otpCheck) throw new Error('4025') // TODO:  4025 otp is already generated
    },
  },
})

export const VALIDATION_OTP_CODE = (
  where: Location,
  checkBy: 'otpId' | 'otp',
): ParamSchema => ({
  in: [where],
  isString: true,
  notEmpty: true,
  custom: {
    options: async (value, { req, location, path }) => {
      const otpCode = await otpModel.getByFieldAndValue(checkBy, value)
      if (!otpCode) throw new Error('4021 ') //TODO: 1021 otp is expired

      req.otp = {
        email: otpCode.email,
        userId: otpCode.userId,
        otpId: otpCode.otpId,
      }
      return true
    },
  },
})

export const VALIDATION_RECIPIENT_ID = (where: Location): ParamSchema => ({
  in: [where],
  isString: true,
  notEmpty: true,
  custom: {
    options: async (value, { req, location, path }) => {
      const get = await recipientModel.getByFieldAndValue('recipientId', value)
      if (!get) throw Error('4015') // TODO: recipient not found

      return true
    },
  },
})

export const VALIDATION_FILES = (where: Location): ParamSchema => ({
  in: where,
  isArray: {
    errorMessage: 'files must be an array',
  },
  custom: {
    options: (files) => {
      if (!Array.isArray(files)) return false

      return files.every(
        (file) =>
          typeof file.uploadId === 'string' &&
          typeof file.recipientId === 'string' &&
          typeof file.filename === 'string' &&
          typeof file.path === 'string' &&
          typeof file.filesize === 'number' &&
          typeof file.mimeType === 'string' &&
          typeof file.fileKey === 'string' &&
          typeof file.uploadKey === 'string',
      )
    },
    errorMessage: 'Each file must have valid fields of correct types',
  },
})
