import { Router } from 'express'
import validateToken from '../middlewares/validateToken'
import * as teacherDisciplineController from '../controllers/teacherDisciplineController'

const teacherDisciplineRouter = Router()

teacherDisciplineRouter.get('/teachersDisciplines/:teacherId/:disciplineId', validateToken, teacherDisciplineController.getTeacherDiscipline)
teacherDisciplineRouter.get('/teachersDisciplines/:disciplineId', validateToken, teacherDisciplineController.getDisciplineTeachers)

export default teacherDisciplineRouter