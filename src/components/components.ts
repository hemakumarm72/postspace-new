import express from 'express'

import userComponent from './users'

const router = express.Router()

router.use('/user', userComponent)

export default router
