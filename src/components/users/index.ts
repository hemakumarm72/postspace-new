import express from 'express'

import { isUser } from '../../utils/auth'
import authComponent from './auth'
import linkComponent from './link'
import recipientComponent from './recipient'

const router = express.Router()

router.use('/auth', authComponent)
router.use('/recipient', isUser, recipientComponent)
router.use('/link', isUser, linkComponent)

export default router
