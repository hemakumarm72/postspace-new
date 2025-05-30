import { NewLinkDocument } from '../../../models/@types'
import { linkModel } from '../../../models/link'

export const createRegistrationLink = async (link: NewLinkDocument) => {
  try {
    const isExiting = await linkModel.getByFieldAndValue(
      'recipientId',
      link.recipientId,
    )
    if (!isExiting) await linkModel.add(link)
    else
      await linkModel.update({
        fieldName: 'recipientId',
        value: link.recipientId,
        updateData: link,
      })
    return
  } catch (error) {
    return Promise.reject(error)
  }
}
