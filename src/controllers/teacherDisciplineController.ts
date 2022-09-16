import { TeacherDiscipline } from "@prisma/client";
import { Request, Response } from "express";
import * as teacherDisciplineService from '../services/teacherDisciplineService'

export async function getTeacherDiscipline(req: Request, res: Response) {
    const teacherId: number = Number(req.params.teacherId)
    const disciplineId: number = Number(req.params.disciplineId)

    const teacherAndDiscipline: TeacherDiscipline | null = await teacherDisciplineService.teacherDiscipline(teacherId, disciplineId)

    res.status(200).send(teacherAndDiscipline)
}