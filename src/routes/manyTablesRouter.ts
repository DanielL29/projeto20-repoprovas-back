import { Router } from 'express'
import validateToken from '../middlewares/validateToken'
import * as manyTablesController from '../controllers/manyTablesController'

const manyTablesRouter = Router()

manyTablesRouter.get('/manyTables', validateToken, manyTablesController.getManyTables)
manyTablesRouter.get('/manyTables/:teacherId/:disciplineId', validateToken, manyTablesController.getTeacherDiscipline)

export default manyTablesRouter