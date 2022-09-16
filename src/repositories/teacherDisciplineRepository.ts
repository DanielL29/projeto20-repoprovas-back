import { TeacherDiscipline } from "@prisma/client";
import { prisma } from "../database/db";

export async function findById(id: number): Promise<TeacherDiscipline | null> {
    const teacherDiscipline: TeacherDiscipline | null = await prisma.teacherDiscipline.findUnique({ where: { id } })

    return teacherDiscipline
}

export async function findByTeacherAndDiscipline(teacherId: number, disciplineId: number): Promise<TeacherDiscipline | null> {
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