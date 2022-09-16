import * as userRepository from '../repositories/userRepository'
import jwt from 'jsonwebtoken'
import { User } from '@prisma/client'
import { verifyData } from '../utils/verifyDataUtil'
import { hash } from '../utils/hashUtils'
import { UserInsertData } from '../types/userType'

export async function signUp(user: UserInsertData) {
    const isUser: User | null = await userRepository.findByEmail(user.email)

    verifyData.conflictDataExists(isUser, 'email')
    const password: string = hash.hashSync(user.password)

    delete user.confirmPassword

    await userRepository.insert({ ...user, password })
}

export async function signIn(user: UserInsertData): Promise<string> {
    const isUser: User | null = await userRepository.findByEmail(user.email)
    const secretKey: string | undefined = process.env.SECRET_KEY

    verifyData.foundData(isUser, 'user', 'users')
    hash.compareSync(user.password, isUser!.password)

    const token = jwt.sign({ id: isUser!.id }, secretKey!, { expiresIn: '1h' })

    return token
}