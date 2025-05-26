import { NextFunction, Request, Response } from 'express'

import { handleResponse } from '../../../middleware/requestHandle'
import { NewRecipientDocument } from '../../../models/@types'
import { recipientModel } from '../../../models/recipient'
import { generatedId } from '../../../utils/randomId'

export const getRecipients = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { userId } = req.user
    const result = await recipientModel.get({ userId })
    return handleResponse(res, 200, { result })
  } catch (error) {
    next(error)
  }
}

export const createRecipients = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { userId } = req.user
    const { name } = req.body

    const create: NewRecipientDocument = {
      recipientId: generatedId(),
      userId,
      name,
      email: null,
      isPaused: false,
    }
    await recipientModel.add(create)

    return handleResponse(res, 200, {})
  } catch (error) {
    next(error)
  }
}

export const updateRecipients = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { recipientId } = req.params
    const { name } = req.body
    await recipientModel.update({
      fieldName: 'recipientId',
      value: recipientId,
      updateData: name,
    })

    return handleResponse(res, 200, {})
  } catch (error) {
    next(error)
  }
}

export const deleteRecipients = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { recipientId } = req.params

    await recipientModel.deleteOne('recipientId', recipientId)
    return handleResponse(res, 200, {})
  } catch (error) {
    next(error)
  }
}
