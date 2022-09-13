import { prisma } from "../database/db.js";
import { TestInsertData } from "../types/testType.js";

export async function insert(test: TestInsertData) {
    await prisma.test.create({ data: test })
}