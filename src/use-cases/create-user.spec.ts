import { InMemoryUsersRepository } from '../repositories/in-memory/in-memory-users-repository'
import { describe, it, expect, beforeEach } from 'vitest'
import { CreateUserUseCase } from './create-user'
import { EmailAlreadyExistsError } from './errors/email-already-exists-error'
import { compare } from 'bcryptjs'

let usersRepository: InMemoryUsersRepository
let createUserUseCase: CreateUserUseCase
describe("Create User Use Case", () => {
    beforeEach(async () => {
        usersRepository = new InMemoryUsersRepository()
        createUserUseCase = new CreateUserUseCase(usersRepository)
    })
    it("should be able to create a new user", async () => {
        const { user } = await createUserUseCase.execute({
            name: 'Tester',
            email: "tester@test.com",
            password: "123456",
        })
        expect(user.id).toStrictEqual(expect.any(String))
    })

    it("should not be able to recreate an existing user", async () => {
        const name = 'Tester'
        const email = "tester@test.com"
        const password = "123456"
        await createUserUseCase.execute({
            name,
            email,
            password
        })

        await expect(() =>
            createUserUseCase.execute({
                name,
                email,
                password
            })
        ).rejects.toBeInstanceOf(EmailAlreadyExistsError)

    })

    it("should be able to hash users password ", async () => {
        const { user } = await createUserUseCase.execute({
            name: 'Tester',
            email: "tester@test.com",
            password: "123456",
        })
        const isPasswordCorrectlyHashed = await compare('123456', user.password_hash)

        expect(isPasswordCorrectlyHashed).toBe(true)
    })
})