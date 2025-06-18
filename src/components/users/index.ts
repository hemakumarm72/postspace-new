import express from 'express'

import { isUser } from '../../utils/auth'
import authComponent from './auth'
import deviceComponent from './device'
import linkComponent from './link'
import recipientComponent from './recipient'
import uploadComponent from './upload'

const router = express.Router()

router.use('/auth', authComponent)
router.use('/recipient', isUser, recipientComponent)
router.use('/link', isUser, linkComponent)
router.use('/upload', isUser, uploadComponent)
router.use('/device', isUser, deviceComponent)

export default router
