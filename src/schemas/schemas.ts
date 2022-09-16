import { ObjectSchema } from "joi"
import testSchema from "./testSchema"
import userSchema from "./userSchema"

export interface Schemas {
    [key: string]: ObjectSchema
}

const schemas: Schemas = {
    user: userSchema,
    test: testSchema
}

export default schemas