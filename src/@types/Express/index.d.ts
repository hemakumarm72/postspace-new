declare namespace Express {
  interface Request {
    user: {
      userId: string
      email: string | null
      userKey: string
      isGuest: boolean
      pinSalt?: string | null
      pinHash?: string | null
    }
    googleAuth: {
      email?: string
      name?: string
      isNewUser?: boolean
    }
    otp: {
      otp: number
      otpId: string
      email: string
      userId?: string | null
    }
    link: LinkDocument
    recipient: RecipientDocument
    files: UploadDocument[]
  }
}
