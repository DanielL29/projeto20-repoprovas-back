import { TestInsertData } from "../types/testType";
import * as testRepository from '../repositories/testRepository'
import * as categoryRepository from '../repositories/categoryRepository'
import * as teacherDisciplineRepository from '../repositories/teacherDisciplineRepository'
import * as userRepository from '../repositories/userRepository'
import * as errors from '../errors/errorsThrow'
import { Category, TeacherDiscipline, Test, User } from "@prisma/client";
import sgMail from '@sendgrid/mail'
import dotenv from 'dotenv'

dotenv.config()

const sendGridApiKey = process.env.SENDGRID_API_KEY

async function sendTestEmailToAllUser(insertedTest: Test) {
    const users: User[] = await userRepository.findAll()
    const category: Category | null = await categoryRepository.findById(insertedTest.categoryId)

    sgMail.setApiKey(sendGridApiKey!)

    users.forEach(async user => {
        const msg = {
            to: user.email,
            from: 'daniell.ederli@hotmail.com',
            subject: 'Nova prova inserida no RepoProvas!',
            text: 'Prova inserida:',
            html: `A seguinte prova foi adicionadas: ${insertedTest.name} (${category!.name})`,
        }

        await sgMail.send(msg)
    })
}

export async function newTest(test: TestInsertData) {
    const isCategory: Category | null = await categoryRepository.findById(test.categoryId)

    if (!isCategory) {
        throw errors.notFound('category', 'categories')
    }

    const isTeacherDiscipline: TeacherDiscipline | null = await teacherDisciplineRepository.findById(test.teacherDisciplineId)

    if (!isTeacherDiscipline) {
        throw errors.notFound('teacherDiscipline', 'teachersDisciplines')
    }

    const insertedTest: Test = await testRepository.insert(test)

    sendTestEmailToAllUser(insertedTest)
}

export async function allTestsByDiscipline() {
    const testsByDiscipline = await testRepository.findTestsByDiscipline()

    return testsByDiscipline
}

export async function allTestsByTeacher() {
    const testsByTeacher = await testRepository.findTestsByTeacher()

    return testsByTeacher
}