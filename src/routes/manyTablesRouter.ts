import { Router } from 'express'
import validateToken from '../middlewares/validateToken.js'
import * as manyTablesController from '../controllers/manyTablesController.js'

const manyTablesRouter = Router()

manyTablesRouter.get('/manyTables', validateToken, manyTablesController.getManyTables)
manyTablesRouter.get('/manyTables/:teacherId/:disciplineId', validateToken, manyTablesController.getTeacherDiscipline)

export default manyTablesRouter