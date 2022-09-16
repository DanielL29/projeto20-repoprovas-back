import * as teacherDisciplineRepository from '../repositories/teacherDisciplineRepository'
import * as errors from '../errors/errorsThrow'

export async function teacherDiscipline(teacherId: number, disciplineId: number) {
    const teacherAndDiscipline = await teacherDisciplineRepository.findByTeacherAndDiscipline(teacherId, disciplineId)

    if (!teacherAndDiscipline) {
        throw errors.notFound('teacherDiscipline', 'teachersDisciplines')
    }

    return teacherAndDiscipline
}