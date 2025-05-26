import { RecipientDocument } from '../@types'
import { BaseModel } from '../base/base.model'
import { Recipients } from './recipient.entity'

class RecipientModel extends BaseModel<RecipientDocument> {
  constructor() {
    super(Recipients)
  }
}

export const recipientModel = new RecipientModel()
