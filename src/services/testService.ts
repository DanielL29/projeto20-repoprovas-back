import { TestInsertData } from "../types/testType.js";
import * as testRepository from '../repositories/testRepository.js'

export async function newTest(test: TestInsertData) {
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