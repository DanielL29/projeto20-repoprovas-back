import { faker } from '@faker-js/faker'
import { User } from '@prisma/client'
import { prisma } from '../../src/database/db'
import { UserInsertData } from '../../src/types/userType'
import { hash } from '../../src/utils/hashUtils'

export function createUser(): UserInsertData {
    const user: UserInsertData = {
        email: faker.internet.email(),
        password: faker.internet.password()
    }

    return user
}

export async function insertUser(): Promise<{ password: string, insertedUser: User }> {
    const user: UserInsertData = createUser()

    const insertedUser: User = await prisma.user.create({
        data: {
            ...user,
            password: hash.hashSync(user.password)
        }
    })

    return { password: user.password, insertedUser }
}