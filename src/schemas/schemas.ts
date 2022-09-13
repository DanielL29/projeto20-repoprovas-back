import { ObjectSchema } from "joi"
import userSchema from "./userSchema.js"

export interface Schemas {
    [key: string]: ObjectSchema
}

const schemas: Schemas = {
    user: userSchema
}

export default schemas