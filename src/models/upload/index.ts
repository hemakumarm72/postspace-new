import { UploadDocument, UserDocument } from '../@types'
import { BaseModel } from '../base/base.model'
import { Uploads } from './upload.entity'

class UploadModel extends BaseModel<UploadDocument> {
  constructor() {
    super(Uploads)
  }
}

export const uploadModel = new UploadModel()
