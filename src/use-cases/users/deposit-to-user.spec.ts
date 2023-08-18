import { describe, it, expect, beforeEach, beforeAll } from 'vitest'
import { CreateUserUseCase } from './create-user'
import { InMemoryUsersRepository } from '../../repositories/in-memory/users/in-memory-users-repository'
import { DepositToUserUseCase } from './deposit-to-user'

let usersRepository: InMemoryUsersRepository
let createUserUseCase: CreateUserUseCase
let depositToUserUseCase: DepositToUserUseCase

describe("Deposit to user Use Case", async () => {
    beforeAll(async () => {
        usersRepository = new InMemoryUsersRepository()
        createUserUseCase = new CreateUserUseCase(usersRepository)
        depositToUserUseCase = new DepositToUserUseCase(usersRepository)
    })

    it("Should be able to get user balance", async () => {
        const { user } = await createUserUseCase.execute({
            name: 'Tester',
            email: "tester@test.com",
            password: "123456",
        })
        expect(user.balance).toStrictEqual(0)

        const depositToUser = await usersRepository.depositToUser(user.id, 1000)
        expect(depositToUser).toStrictEqual(1000)
        expect(depositToUser).not.toBeInstanceOf(String)
    })
})