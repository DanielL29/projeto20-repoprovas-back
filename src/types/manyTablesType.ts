import { Category, Discipline, Teacher } from "@prisma/client"

export type ManyTables = {
    categories?: Category[]
    disciplines?: Discipline[]
    teachers?: Teacher[]
}