import app from '../src/app';
import supertest from 'supertest';
import * as userFactory from './factories/userFactory';
import { prisma } from '../src/database/db';

beforeAll(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE "users"`
})

describe('POST /sign-up', () => {
    it('given a valid user should return 201', async () => {
        const user = userFactory.createUser()

        const result = await supertest(app).post('/sign-up').send(user)
        expect(result.status).toBe(201)
    })

    it('given a user already inserted return 409', async () => {
        const { insertedUser } = await userFactory.insertUser()

        const result = await supertest(app).post('/sign-up').send({ email: insertedUser.email, password: insertedUser.password })
        expect(result.status).toBe(409)
    })

    it('given a body without object/json return 422', async () => {
        const result = await supertest(app).post('/sign-up')
        expect(result.status).toBe(422)
    })
})

describe('POST /sign-in', () => {
    it('given a inserted user on db to login return 200', async () => {
        const { password, insertedUser } = await userFactory.insertUser()

        const result = await supertest(app).post('/sign-in').send({ email: insertedUser.email, password })
        expect(result.status).toBe(200)
    })

    it('given a user not founded on db return 404', async () => {
        const user = userFactory.createUser()

        const result = await supertest(app).post('/sign-in').send(user)
        expect(result.status).toBe(404)
    })

    it('given a wrong password return 401', async () => {
        const { insertedUser } = await userFactory.insertUser()

        const result = await supertest(app).post('/sign-in').send({ email: insertedUser.email, password: 'wrong password' })
        expect(result.status).toBe(400)
    })

    it('given a body without object/json return 422', async () => {
        const result = await supertest(app).post('/sign-in')
        expect(result.status).toBe(422)
    })
})

afterAll(async () => {
    await prisma.$disconnect()
})