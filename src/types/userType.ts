import * as Prisma from "@prisma/client";

export type UserInsertData = Omit<Prisma.User, 'id' | 'createdAt'> & { confirmPassword?: string }
export type allModels =
    | Prisma.User
    | Prisma.Category
    | Prisma.Term
    | Prisma.Teacher
    | Prisma.Discipline
    | Prisma.TeacherDiscipline
    | Prisma.Test