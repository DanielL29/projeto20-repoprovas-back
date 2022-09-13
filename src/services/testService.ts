import { TestInsertData } from "../types/testType.js";
import * as testRepository from '../repositories/testRepository.js'

export async function newTest(test: TestInsertData) {
    await testRepository.insert(test)
}