import * as userRepository from '../repositories/userRepository'
import jwt from 'jsonwebtoken'
import { User } from '@prisma/client'
import { verifyData } from '../utils/verifyDataUtil'
import { hash } from '../utils/hashUtils'
import { UserInsertData } from '../types/userType'
import axios from 'axios'

const secretKey = process.env.SECRET_KEY
const client_id = process.env.GITHUB_CLIENT_ID
const client_secret = process.env.GITHUB_CLIENT_SECRET

export async function signUp(user: UserInsertData) {
    const isUser: User | null = await userRepository.findByEmail(user.email)

    verifyData.conflictDataExists(isUser, 'email')
    const password: string = hash.hashSync(user.password)

    delete user.confirmPassword

    await userRepository.insert({ ...user, password })
}

export async function signIn(user: UserInsertData): Promise<string> {
    const isUser: User | null = await userRepository.findByEmail(user.email)

    verifyData.foundData(isUser, 'user', 'users')
    hash.compareSync(user.password, isUser!.password)

    const token = jwt.sign({ id: isUser!.id }, secretKey!, { expiresIn: '1h' })

    return token
}

export async function githubOAuth(code: string): Promise<string> {
    const { data: access } = await axios.post('https://github.com/login/oauth/access_token', {}, {
        params: {
            client_id,
            client_secret,
            code
        },
        headers: {
            Accept: 'application/json'
        }
    })

    const { data: githubUser } = await axios.get('https://api.github.com/user?scope=user:email', {
        headers: {
            Authorization: `Bearer ${access.access_token}`
        }
    })

    if (githubUser.email) {
        const isUser = await userRepository.findByEmail(githubUser.email)

        if (isUser) {
            const token = jwt.sign({ id: isUser.id }, secretKey!, { expiresIn: '1h' })

            return token
        }
    }

    const token = jwt.sign({ id: githubUser.id }, secretKey!, { expiresIn: '1h' })

    return token
}