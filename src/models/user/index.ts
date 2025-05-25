import { UserDocument } from '../@types'
import { BaseModel } from '../base/base.model'
import { Users } from './user.entity'

class UserModel extends BaseModel<UserDocument> {
  constructor() {
    super(Users)
  }
}

export const userModel = new UserModel()
