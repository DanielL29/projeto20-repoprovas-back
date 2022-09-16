import { Request, Response } from "express";
import * as authService from '../services/userService'
import { UserInsertData } from "../types/userType";

export async function create(req: Request, res: Response) {
    const user: UserInsertData = req.body

    await authService.signUp(user)

    res.sendStatus(201)
}

export async function login(req: Request, res: Response) {
    const user: UserInsertData = req.body

    const token = await authService.signIn(user)

    res.status(200).send({ token })
}