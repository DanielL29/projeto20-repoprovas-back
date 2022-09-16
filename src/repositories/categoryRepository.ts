import { Category } from "@prisma/client";
import { prisma } from "../database/db";

export async function findById(id: number): Promise<Category | null> {
    const category: Category | null = await prisma.category.findUnique({ where: { id } })

    return category
}