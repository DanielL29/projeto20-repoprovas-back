import bcrypt from 'bcrypt'
import * as errors from '../errors/errorsThrow'

interface HashLiterals {
    hashSync: (password: string) => string
    compareSync: (password: string, encryptedPassword: string) => void
}

export const hash: HashLiterals = {
    hashSync: (password) => {
        return bcrypt.hashSync(password, 10)
    },
    compareSync: (password, encryptedPassword) => {
        if (!bcrypt.compareSync(password, encryptedPassword)) {
            throw errors.badRequest('Wrong password')
        }
    }
}