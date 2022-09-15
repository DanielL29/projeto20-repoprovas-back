import { prisma } from "../database/db.js";
import { TestInsertData } from "../types/testType.js";

export async function insert(test: TestInsertData) {
    await prisma.test.create({ data: test })
}

export async function findTestsByDiscipline() {
    const testsByDiscipline = await prisma.term.findMany({
        select: {
            id: true,
            number: true,
            disciplines: {
                select: {
                    id: true,
                    name: true,
                    teachersDisciplines: {
                        select: {
                            tests: {
                                select: {
                                    id: true,
                                    name: true,
                                    pdfUrl: true,
                                    categoryId: true,
                                    category: { select: { name: true } },
                                    teacherDiscipline: {
                                        select: {
                                            discipline: { select: { id: true } },
                                            teacher: { select: { name: true } }
                                        }
                                    }
                                },
                                orderBy: { categoryId: 'asc' }
                            }
                        }
                    }
                }
            }
        }
    })

    return testsByDiscipline
}

export async function findTestsByTeacher() {
    const testsByTeacher = await prisma.teacher.findMany({
        select: {
            id: true,
            name: true,
            teachersDisciplines: {
                select: {
                    tests: {
                        select: {
                            id: true,
                            name: true,
                            pdfUrl: true,
                            categoryId: true,
                            category: { select: { name: true } },
                            teacherDiscipline: {
                                select: {
                                    discipline: { select: { name: true } }
                                }
                            }
                        }
                    }
                }
            }
        }
    })

    return testsByTeacher
}