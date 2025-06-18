import { NewLinkDocument } from '../../../models/@types'
import { linkModel } from '../../../models/link'

export const createRegistrationLink = async (link: NewLinkDocument) => {
  try {
    await linkModel.add(link)

    return
  } catch (error) {
    return Promise.reject(error)
  }
}
