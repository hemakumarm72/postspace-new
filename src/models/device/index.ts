import { DeviceDocument, UploadDocument, UserDocument } from '../@types'
import { BaseModel } from '../base/base.model'
import { Devices } from './device.entity'

class DeviceModel extends BaseModel<DeviceDocument> {
  constructor() {
    super(Devices)
  }
}

export const deviceModel = new DeviceModel()
