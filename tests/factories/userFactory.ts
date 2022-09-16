import { faker } from '@faker-js/faker'
import { User } from '@prisma/client'
import { prisma } from '../../src/database/db'
import { UserInsertData } from '../../src/types/userType'
import { hash } from '../../src/utils/hashUtils'
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'

dotenv.config()

export function createUser(): UserInsertData {
    const user: UserInsertData = {
        email: faker.internet.email(),
        password: faker.internet.password(),
    }

    user.confirmPassword = user.password

    return user
}

export async function insertUser(): Promise<{ password: string, insertedUser: User }> {
    const user: UserInsertData = createUser()
    delete user.confirmPassword

    const insertedUser: User = await prisma.user.create({
        data: {
            ...user,
            password: hash.hashSync(user.password)
        }
    })

    return { password: user.password, insertedUser }
}

export function generateToken(id: number) {
    return jwt.sign({ id }, process.env.SECRET_KEY!, { expiresIn: '1h' })
}