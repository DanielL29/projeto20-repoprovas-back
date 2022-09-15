import { Request, Response } from "express";
import { TestInsertData } from "../types/testType.js";
import * as testService from '../services/testService.js'

export async function create(req: Request, res: Response) {
    const test: TestInsertData = req.body

    await testService.newTest(test)

    res.sendStatus(201)
}

export async function getByDiscipline(req: Request, res: Response) {
    const testByDiscipline = await testService.allTestsByDiscipline()

    res.status(200).send(testByDiscipline)
}

export async function getByTeacher(req: Request, res: Response) {
    const testByTeacher = await testService.allTestsByTeacher()

    res.status(200).send(testByTeacher)
}