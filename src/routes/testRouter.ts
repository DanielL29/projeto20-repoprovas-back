import { Router } from 'express'
import validateSchemas from '../middlewares/validateSchemas.js'
import validateToken from '../middlewares/validateToken.js'
import * as testController from '../controllers/testController.js'

const testRouter = Router()

testRouter.post('/tests', validateToken, validateSchemas('test'), testController.create)

export default testRouter