import * as manyTablesRepository from '../repositories/manyTablesRepository.js'
import * as errors from '../errors/errorsThrow.js'

export async function manyTables() {
    const manyTables = await manyTablesRepository.findManyTables()

    return manyTables
}

export async function teacherDiscipline(teacherId: number, disciplineId: number) {
    const teacherAndDiscipline = await manyTablesRepository.findTeacherAndDiscipline(teacherId, disciplineId)

    if (!teacherAndDiscipline) {
        throw errors.notFound('teacherDiscipline', 'teachersDisciplines')
    }

    return teacherAndDiscipline
}