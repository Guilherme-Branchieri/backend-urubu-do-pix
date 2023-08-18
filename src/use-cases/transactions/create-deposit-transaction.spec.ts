import { describe, it, expect, beforeEach, beforeAll } from 'vitest'
import { CreateUserUseCase } from '../users/create-user'
import { InMemoryUsersRepository } from '../../repositories/in-memory/users/in-memory-users-repository'
import { InMemoryTransactionsRepository } from '../../repositories/in-memory/transactions/in-memory-transaction-repository'
import { CreateDepositTransactionUseCase } from './create-deposit-transaction'
import { number, object, string } from 'zod'

let usersRepository: InMemoryUsersRepository
let transactionsRepository: InMemoryTransactionsRepository
let createUserUseCase: CreateUserUseCase
let createDepositTransaction: CreateDepositTransactionUseCase
describe("Create Deposit Transaction Use Case", async () => {
    beforeAll(async () => {
        usersRepository = new InMemoryUsersRepository()
        createUserUseCase = new CreateUserUseCase(usersRepository)
        transactionsRepository = new InMemoryTransactionsRepository()
        createDepositTransaction = new CreateDepositTransactionUseCase(usersRepository, transactionsRepository)
    })

    it("Should be able to create a new transaction", async () => {
        const { user } = await createUserUseCase.execute({
            name: 'Tester',
            email: "tester@test.com",
            password: "123456",
        })

        const transaction = await createDepositTransaction.execute({
            userId: user.id,
            amount: 1000,
            transaction_type: "DEPOSIT",
        })

        expect(transaction.amount).toStrictEqual(1000)
        expect(transaction.userId).toStrictEqual(expect.any(String))
    })
})