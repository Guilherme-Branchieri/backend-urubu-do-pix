import { describe, it, expect, beforeEach } from 'vitest'
import { CreateUserUseCase } from './create-user'
import { InMemoryUsersRepository } from '../../repositories/in-memory/users/in-memory-users-repository'
import { GetUserBalanceUseCase } from './get-user-balance'

let usersRepository: InMemoryUsersRepository
let createUserUseCase: CreateUserUseCase
let getUserBalanceUseCase: GetUserBalanceUseCase
describe("Get User Balance Use Case", () => {
    beforeEach(async () => {
        usersRepository = new InMemoryUsersRepository()
        createUserUseCase = new CreateUserUseCase(usersRepository)
        getUserBalanceUseCase = new GetUserBalanceUseCase(usersRepository)
    })
    it("Should be able to get user balance", async () => {
        const { user } = await createUserUseCase.execute({
            name: 'Tester',
            email: "tester@test.com",
            password: "123456",
        })

        const email = user.email

        const { balance } = await getUserBalanceUseCase.execute({ email })
        expect(balance).toStrictEqual(0)

    })
})