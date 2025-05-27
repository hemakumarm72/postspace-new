import argon2 from 'argon2'
import crypto from 'crypto'

export const hashPin = async (pin: string) => {
  try {
    const pinSalt = crypto.randomBytes(16).toString('hex')
    const pinHash = await argon2.hash(pin, {
      type: argon2.argon2id,
      salt: Buffer.from(pinSalt, 'hex'),
      secret: Buffer.from(process.env.secretKey || ''), // 必要な場合だけ
      hashLength: 32,
      memoryCost: 19456, // As per spec
      timeCost: 2,
      parallelism: 1,
    })
    return { pinSalt, pinHash }
  } catch (error) {
    return Promise.reject(error)
  }
}

export async function hashVerify(hash: string, pin: string) {
  return await argon2.verify(hash, pin, {
    secret: Buffer.from(process.env.secretKey || ''),
  })
}

export const generateHMACKey = (id: string, type: string) => {
  const key = process.env.HMAC_SECRET || ''
  return crypto.createHmac('sha256', key).update(`${type}|${id}`).digest('hex')
}

export const wrapMasterKey = (masterKey: string, wrappingKey: string) => {
  const iv = crypto.randomBytes(12)
  const cipher = crypto.createCipheriv('aes-256-gcm', wrappingKey, iv)
  const encrypted = Buffer.concat([cipher.update(masterKey), cipher.final()])
  const tag = cipher.getAuthTag()
  return { iv, encrypted, tag }
}
