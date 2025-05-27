declare namespace Express {
  interface Request {
    user: {
      userId: string
      userKey: string
      email?: string
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
    space: any
    receiver: any
    notification: any
    plan: any
  }
}
