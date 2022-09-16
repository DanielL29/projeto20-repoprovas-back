import { faker } from "@faker-js/faker";
import { Test } from "@prisma/client";
import { prisma } from "../../src/database/db";
import { TestInsertData } from "../types/testType";

export function createTest(): TestInsertData {
    const test: TestInsertData = {
        name: faker.name.jobTitle(),
        pdfUrl: "https://repositorio.animaeducacao.com.br/bitstream/ANIMA/18243/1/TCC%20CRIPTO%20.pdf",
        categoryId: 1,
        teacherDisciplineId: 1
    }

    return test
}

export async function insertTest(): Promise<Test> {
    const test: TestInsertData = createTest()

    const insertedTest: Test = await prisma.test.create({ data: test })

    return insertedTest
}