import express from 'express'

import 'dotenv/config'

import { registerComponents } from './components'
import { config, errorHandler } from './middleware'
import { generateHMACKey } from './utils/crypto'
import { generatedId } from './utils/randomId'

const app: express.Application = express()

config(app)

registerComponents(app)

errorHandler(app)

// const test = () => {
//   const userId = generatedId()
//   console.log(userId)
//   console.log(generateHMACKey(userId, 'userId'))
// }

// test()
export default app
