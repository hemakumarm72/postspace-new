import mongoose from 'mongoose'
import RandomString from 'randomstring'
import { v4 as uuidv4 } from 'uuid'

export const generatedId = () => uuidv4()

export const generateUniqueId = (): string => {
  return uuidv4().substring(0, 12)
}

export const randomNumber = (
  length: number = 6,
  charset:
    | 'alphanumeric'
    | 'alphabetic'
    | 'numeric'
    | 'hex'
    | 'binary'
    | 'octal',
) => {
  let number
  do {
    number = RandomString.generate({
      length: length,
      charset: charset,
    })
  } while (
    number.length !== length ||
    number.length < length ||
    number[0] === '0'
  )
  console.log(length)
  console.log(number.length)
  console.log(number)
  return number
}

export const objectId = () => new mongoose.Types.ObjectId()

export const generatePassword = (length: number, RegExp: RegExp) => {
  let password

  do {
    password = RandomString.generate({
      length: length,
      charset: 'alphanumeric',
    })
  } while (
    !RegExp.test(password) ||
    password.length !== length ||
    password.length < length ||
    password[0] === '0'
  )

  return password
}
