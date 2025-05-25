import express from 'express'

import { isUser } from '../../utils/auth'
import authComponent from './auth'

const router = express.Router()

router.use('/auth', authComponent)

export default router
