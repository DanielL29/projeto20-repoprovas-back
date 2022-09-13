import { ObjectSchema } from "joi"
import testSchema from "./testSchema.js"
import userSchema from "./userSchema.js"

export interface Schemas {
    [key: string]: ObjectSchema
}

const schemas: Schemas = {
    user: userSchema,
    test: testSchema
}

export default schemas