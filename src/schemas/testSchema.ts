import Joi, { ObjectSchema } from 'joi'
import { TestInsertData } from '../types/testType'

const testSchema: ObjectSchema<TestInsertData> = Joi.object({
    name: Joi.string().required(),
    pdfUrl: Joi.string()
        .pattern(/^http(s?)\:\/\/[0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*(:(0-9)*)*(\/?)([a-zA-Z0-9\-\.\?\,\'\/\\\+&amp;%\$#_]*)?(.pdf)$/)
        .required(),
    categoryId: Joi.number().required(),
    teacherDisciplineId: Joi.number().required()
})

export default testSchema