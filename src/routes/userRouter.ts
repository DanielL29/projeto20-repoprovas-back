import { Router } from 'express'
import validateSchemas from '../middlewares/validateSchemas.js'
import * as userController from '../controllers/userController.js'

const userRouter = Router()

userRouter.post('/sign-up', validateSchemas('user'), userController.create)
userRouter.post('/sign-in', validateSchemas('user'), userController.login)

export default userRouter