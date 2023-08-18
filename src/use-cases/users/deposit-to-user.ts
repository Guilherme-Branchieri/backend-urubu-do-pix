import { TransactionRepository } from "@/repositories/transactions-repository";
import { InvalidTransactionTypeError } from '../errors/invalid-transaction-type-error'
import { UsersRepository } from "@/repositories/users-repository";
import { NotFoundError } from "../errors/not-found-error";

interface depositToUserUseCaseRequest {
    userId: string
    amountToDeposit: number
    transaction_type: string
}


interface depositToUserUseCaseResponse {
    amountToDeposit: number
}

export class DepositToUserUseCase {
    constructor(private usersRepository: UsersRepository) { }
    async execute({
        userId,
        amountToDeposit,
    }: depositToUserUseCaseRequest): Promise<depositToUserUseCaseResponse> {

        const user = await this.usersRepository.findById(userId)
        if (!user) {
            throw new NotFoundError()
        }
        try {
            await this.usersRepository.depositToUser(userId, amountToDeposit)
        } catch (error) {
            console.error(error)
        }
        return { amountToDeposit }

    }
}