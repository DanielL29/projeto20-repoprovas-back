import { Router } from 'express'
import validateSchemas from '../middlewares/validateSchemas'
import * as userController from '../controllers/userController'

const userRouter = Router()

userRouter.post('/sign-up', validateSchemas('user'), userController.create)
userRouter.post('/sign-in', validateSchemas('user'), userController.login)
userRouter.post('/user/oauth', userController.githubOAuthCode)

export default userRouter