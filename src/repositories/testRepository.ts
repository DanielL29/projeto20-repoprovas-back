import { prisma } from "../database/db";
import { TestInsertData } from "../types/testType";

export async function insert(test: TestInsertData) {
    await prisma.test.create({ data: test })
}

export async function findTestsByDiscipline() {
    const testsByDiscipline = await prisma.term.findMany({
        select: {
            id: true, number: true, disciplines: {
                select: {
                    id: true, name: true, categories: {
                        select: {
                            id: true, name: true, tests: {
                                select: {
                                    id: true,
                                    name: true,
                                    pdfUrl: true,
                                    categoryId: true,
                                    teacherDiscipline: {
                                        select: {
                                            discipline: { select: { id: true } },
                                            teacher: { select: { name: true } }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    })

    return testsByDiscipline.map(term => {
        return {
            ...term,
            disciplines: term.disciplines.map(discipline => {
                return {
                    ...discipline,
                    categories: discipline.categories.map(category => {
                        return {
                            ...category,
                            tests: category.tests.map(test => {
                                if (test.teacherDiscipline.discipline.id === discipline.id) {
                                    return test
                                }
                            }).filter(test => test !== undefined)
                        }
                    })
                }
            })
        }
    })
}

export async function findTestsByTeacher() {
    const testsByTeacher = await prisma.teacher.findMany({
        select: {
            id: true, name: true, categories: {
                select: {
                    id: true, name: true, tests: {
                        select: {
                            id: true,
                            name: true,
                            pdfUrl: true,
                            categoryId: true,
                            teacherDiscipline: {
                                select: {
                                    discipline: { select: { name: true } },
                                    teacher: { select: { id: true } }
                                }
                            }
                        }
                    }
                }
            }
        }
    })

    return testsByTeacher.map(teacher => {
        return {
            ...teacher,
            categories: teacher.categories.map(category => {
                return {
                    ...category,
                    tests: category.tests.map(test => {
                        if (test.teacherDiscipline.teacher.id === teacher.id) {
                            return test
                        }
                    }).filter(test => test !== undefined)
                }
            })
        }
    })
}