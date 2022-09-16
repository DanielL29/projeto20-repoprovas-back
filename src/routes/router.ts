import { Router } from 'express'
import manyTablesRouter from './manyTablesRouter'
import testRouter from './testRouter'
import userRouter from './userRouter'

const router = Router()

router.use(userRouter)
router.use(testRouter)
router.use(manyTablesRouter)

export default router