import { FileDocument } from '../@types'
import { BaseModel } from '../base/base.model'
import { Files } from './file.entity'

class FileModel extends BaseModel<FileDocument> {
  constructor() {
    super(Files)
  }
}

export const fileModel = new FileModel()
