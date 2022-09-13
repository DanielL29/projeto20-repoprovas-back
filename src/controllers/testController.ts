import { Request, Response } from "express";
import { TestInsertData } from "../types/testType.js";
import * as testService from '../services/testService.js'

export async function create(req: Request, res: Response) {
    const test: TestInsertData = req.body

    await testService.newTest(test)

    res.sendStatus(201)
}