import { LinkDocument, UploadDocument, UserDocument } from '../@types'
import { BaseModel } from '../base/base.model'
import { Links } from './link.entity'

class LinkModel extends BaseModel<LinkDocument> {
  constructor() {
    super(Links)
  }
}

export const linkModel = new LinkModel()
