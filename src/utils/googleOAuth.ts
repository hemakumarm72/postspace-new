import { OAuth2Client } from 'google-auth-library'

import { logger } from './logger'

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET
const CLIENT_REDIRECT = process.env.GOOGLE_CLIENT_REDIRECT
const client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, CLIENT_REDIRECT)

export const googleOAuth = async (token: string) => {
  try {
    const { tokens } = await client.getToken(token) // exchange code for tokens
    const ticket = await client.verifyIdToken({
      idToken: tokens.id_token as string,
      audience: CLIENT_ID,
    })
    const payload = ticket.getPayload()
    return Promise.resolve(payload)
  } catch (error) {
    logger.error(error)
    return Promise.reject(error)
  }
}
