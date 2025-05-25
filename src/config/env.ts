import dayjs from 'dayjs'

export const frontEndUrl =
  process.env.NODE_ENV === 'development'
    ? process.env.DEV_FRONT_END_URL
    : process.env.PRO_FRONT_END_URL

// TODO: AWS
export const awsConfig = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  region: process.env.AWS_REGION || '',
}

export const AWSBucketName = process.env.AWS_BUCKET_NAME || ''

export const isDev = process.env.NODE_ENV

export const StripeSecretKey = process.env.STRIPE_SECRET_KEY || ''

// TODO: SPACES

export const CRYPTO_LINK_UN_CONNECT_EXPIRATION_TIME = parseInt(
  process.env.CRYPTO_LINK_UN_CONNECT_EXPIRATION_TIME || '3',
)
export const CRYPTO_LINK_UN_CONNECT_EXPIRATION_UNIT = process.env
  .CRYPTO_LINK_UN_CONNECT_EXPIRATION_UNIT as dayjs.ManipulateType | 'd'

export const CRYPTO_LINK_CONNECT_EXPIRATION_TIME = parseInt(
  process.env.CRYPTO_LINK_CONNECT_EXPIRATION_TIME || '7',
)

export const CRYPTO_LINK_CONNECT_EXPIRATION_UNIT = process.env
  .CRYPTO_LINK_UN_CONNECT_EXPIRATION_UNIT as dayjs.ManipulateType | 'd'

export const GUEST_SHARED_SPACE_EXPIRATION_TIME = parseInt(
  process.env.GUEST_SHARED_SPACE_EXPIRATION_TIME || '90',
)
export const GUEST_SHARED_SPACE_EXPIRATION_UNIT = process.env
  .GUEST_SHARED_SPACE_EXPIRATION_UNIT as dayjs.ManipulateType | 'd'

export const FILE_OFFLINE_EXPIRATION_TIME = parseInt(
  process.env.FILE_OFFLINE_EXPIRATION_TIME || '3',
)
export const FILE_OFFLINE_EXPIRATION_UNIT = process.env
  .FILE_OFFLINE_EXPIRATION_UNIT as dayjs.ManipulateType | 'm'

export const BucketFolder =
  isDev === 'development' ? 'Development' : 'Production'
