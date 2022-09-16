import { Router } from 'express'
import validateSchemas from '../middlewares/validateSchemas'
import validateToken from '../middlewares/validateToken'
import * as testController from '../controllers/testController'

const testRouter = Router()

testRouter.post('/tests', validateToken, validateSchemas('test'), testController.create)
testRouter.get('/tests/discipline', validateToken, testController.getByDiscipline)
testRouter.get('/tests/teacher', validateToken, testController.getByTeacher)

export default testRouter