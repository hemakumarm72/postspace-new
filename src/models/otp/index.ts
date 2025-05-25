import { OtpDocument, UserDocument } from '../@types'
import { BaseModel } from '../base/base.model'
import { Otp } from './otp.entity'

class OtpModel extends BaseModel<OtpDocument> {
  constructor() {
    super(Otp)
  }
}

export const otpModel = new OtpModel()


