import { Request, Response } from "express";
import * as manyTablesService from '../services/manyTablesService'

export async function getManyTables(_: Request, res: Response) {
    const manyTables = await manyTablesService.manyTables()

    res.status(200).send(manyTables)
}