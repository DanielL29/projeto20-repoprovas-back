import supertest from "supertest"
import app from "../src/app"
import { prisma } from "../src/database/db"
import * as testFactory from './factories/testFactory'
import * as userFactory from './factories/userFactory'

beforeAll(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE "users"`
    await prisma.$executeRaw`TRUNCATE TABLE "tests"`
})

describe('POST /tests', () => {
    it('given a valid test return 201', async () => {
        const { insertedUser } = await userFactory.insertUser()
        const test = testFactory.createTest()
        const token = userFactory.generateToken(insertedUser.id)

        const result = await supertest(app)
            .post('/tests')
            .set({ Authorization: `Bearer ${token}` })
            .send(test)
        expect(result.status).toBe(201)
    })

    it('given a not found category return 404', async () => {
        const { insertedUser } = await userFactory.insertUser()
        const token = userFactory.generateToken(insertedUser.id)
        const test = testFactory.createTest()
        test.categoryId = -1

        const result = await supertest(app)
            .post('/tests')
            .set({ Authorization: `Bearer ${token}` })
            .send(test)
        expect(result.status).toBe(404)
    })

    it('given a not found teacherDiscipline return 404', async () => {
        const { insertedUser } = await userFactory.insertUser()
        const token = userFactory.generateToken(insertedUser.id)
        const test = testFactory.createTest()
        test.teacherDisciplineId = -1

        const result = await supertest(app)
            .post('/tests')
            .set({ Authorization: `Bearer ${token}` })
            .send(test)
        expect(result.status).toBe(404)
    })

    it('given a body without object/json return 422', async () => {
        const { insertedUser } = await userFactory.insertUser()
        const token = userFactory.generateToken(insertedUser.id)

        const result = await supertest(app).post('/tests').set({ Authorization: `Bearer ${token}` })
        expect(result.status).toBe(422)
    })

    it('given a test without headers(Authorization) return 401', async () => {
        const test = testFactory.createTest()

        const result = await supertest(app)
            .post('/tests')
            .send(test)
        expect(result.status).toBe(401)
    })
})

describe('GET /tests/discipline', () => {
    it('given a array with tests by its disciplines return 200 and an array', async () => {
        const { insertedUser } = await userFactory.insertUser()
        const token = userFactory.generateToken(insertedUser.id)

        const result = await supertest(app)
            .get('/tests/discipline')
            .set({ Authorization: `Bearer ${token}` })
        expect(result.body).toBeInstanceOf(Array)
        expect(result.status).toBe(200)
    })

    it('given a test without headers(Authorization) return 401', async () => {
        const result = await supertest(app)
            .get('/tests/discipline')
        expect(result.status).toBe(401)
    })
})

describe('GET /tests/teacher', () => {
    it('given a array with tests by its teacher return 200 and an array', async () => {
        const { insertedUser } = await userFactory.insertUser()
        const token = userFactory.generateToken(insertedUser.id)

        const result = await supertest(app)
            .get('/tests/teacher')
            .set({ Authorization: `Bearer ${token}` })
        expect(result.body).toBeInstanceOf(Array)
        expect(result.status).toBe(200)
    })

    it('given a test without headers(Authorization) return 401', async () => {
        const result = await supertest(app)
            .get('/tests/discipline')
        expect(result.status).toBe(401)
    })
})

afterAll(async () => {
    await prisma.$disconnect()
})