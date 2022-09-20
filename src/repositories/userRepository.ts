import { User } from "@prisma/client";
import { prisma } from "../database/db";
import { UserInsertData } from "../types/userType";

export async function findByEmail(email: string): Promise<User | null> {
    const user: User | null = await prisma.user.findUnique({ where: { email } })

    return user
}

export async function insert(user: UserInsertData) {
    await prisma.user.create({ data: user })
}

export async function findAll(): Promise<User[]> {
    const user: User[] = await prisma.user.findMany()

    return user
}