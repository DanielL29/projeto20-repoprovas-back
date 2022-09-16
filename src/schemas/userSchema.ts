import Joi from 'joi'
import { UserInsertData } from '../types/userType'

const userSchema = Joi.object<UserInsertData>({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    confirmPassword: Joi.valid(Joi.ref('password'))
})

export default userSchema