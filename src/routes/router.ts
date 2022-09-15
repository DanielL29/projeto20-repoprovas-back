import { Router } from 'express'
import manyTablesRouter from './manyTablesRouter.js'
import testRouter from './testRouter.js'
import userRouter from './userRouter.js'

const router = Router()

router.use(userRouter)
router.use(testRouter)
router.use(manyTablesRouter)

export default router