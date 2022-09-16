import { TestInsertData } from "../types/testType";
import * as testRepository from '../repositories/testRepository'
import * as categoryRepository from '../repositories/categoryRepository'
import * as teacherDisciplineRepository from '../repositories/teacherDisciplineRepository'
import * as errors from '../errors/errorsThrow'
import { Category, TeacherDiscipline } from "@prisma/client";

export async function newTest(test: TestInsertData) {
    const isCategory: Category | null = await categoryRepository.findById(test.categoryId)

    if (!isCategory) {
        throw errors.notFound('category', 'categories')
    }

    const isTeacherDiscipline: TeacherDiscipline | null = await teacherDisciplineRepository.findById(test.teacherDisciplineId)

    if (!isTeacherDiscipline) {
        throw errors.notFound('teacherDiscipline', 'teachersDisciplines')
    }

    await testRepository.insert(test)
}

export async function allTestsByDiscipline() {
    const testsByDiscipline = await testRepository.findTestsByDiscipline()

    return testsByDiscipline
}

export async function allTestsByTeacher() {
    const testsByTeacher = await testRepository.findTestsByTeacher()

    return testsByTeacher
}