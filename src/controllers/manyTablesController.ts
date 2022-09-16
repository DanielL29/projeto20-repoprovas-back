import { Request, Response } from "express";
import * as manyTablesService from '../services/manyTablesService'

export async function getManyTables(_: Request, res: Response) {
    const manyTables = await manyTablesService.manyTables()

    res.status(200).send(manyTables)
}

export async function getTeacherDiscipline(req: Request, res: Response) {
    const teacherId: number = Number(req.params.teacherId)
    const disciplineId: number = Number(req.params.disciplineId)

    const teacherAndDiscipline = await manyTablesService.teacherDiscipline(teacherId, disciplineId)

    res.status(200).send(teacherAndDiscipline)
}