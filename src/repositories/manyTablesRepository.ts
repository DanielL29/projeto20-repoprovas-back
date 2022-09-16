import { Category, Discipline, Teacher, TeacherDiscipline } from "@prisma/client";
import { prisma } from "../database/db";
import { ManyTables } from "../types/manyTablesType";

export async function findManyTables(): Promise<ManyTables> {
    const categories: Category[] = await prisma.category.findMany()
    const disciplines: Discipline[] = await prisma.discipline.findMany()
    const teachers: Teacher[] = await prisma.teacher.findMany()

    return { categories, disciplines, teachers }
}

export async function findTeacherAndDiscipline(teacherId: number, disciplineId: number): Promise<TeacherDiscipline | null> {
    const teacherAndDiscipline: TeacherDiscipline | null = await prisma.teacherDiscipline.findUnique({
        where: {
            teacherId_disciplineId: {
                teacherId,
                disciplineId
            }
        }
    })

    return teacherAndDiscipline
}   