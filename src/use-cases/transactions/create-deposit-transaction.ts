import { InvalidTransactionTypeError } from '../errors/invalid-transaction-type-error'
import { UsersRepository } from "@/repositories/users-repository";
import { NotFoundError } from "../errors/not-found-error";
import { TransactionRepository } from "@/repositories/transactions-repository"; // Import the TransactionRepository
import { Transaction } from '@prisma/client';

interface CreateDepositTransactionUseCaseRequest {
    userId: string;
    amount: number;
    transaction_type: string;
}

interface CreateDepositTransactionUseCaseResponse {
    amount: number
    userId: string
}

export class CreateDepositTransactionUseCase {
    constructor(
        private usersRepository: UsersRepository,
        private transactionsRepository: TransactionRepository
    ) { }

    async execute({
        userId,
        amount,
        transaction_type,
    }: CreateDepositTransactionUseCaseRequest): Promise<CreateDepositTransactionUseCaseResponse> {
        
        if (transaction_type !== "DEPOSIT") {
            throw new InvalidTransactionTypeError();
        }

        try {
            const user = await this.usersRepository.findById(userId);

            if (!user) {
                throw new NotFoundError();
            }

            const transaction = await this.transactionsRepository.createDepositTransaction({
                amount,
                transaction_type: 'DEPOSIT',
                userId: user.id,
            });
            
            await this.usersRepository.depositToUser(userId, amount);

            return {amount: transaction.amount, userId: transaction.userId}

        } catch (error) {
            throw error;
        }
    }
}




// import { TransactionRepository } from "@/repositories/transactions-repository";
// import { InvalidTransactionTypeError } from '../errors/invalid-transaction-type-error'
// import { UsersRepository } from "@/repositories/users-repository";
// import { NotFoundError } from "../errors/not-found-error";

// interface createDepositTransactionUseCaseRequest {
//     userId: string
//     amount: number
//     transaction_type: string
// }


// interface createDepositTransactionUseCaseResponse {
//     amountToDeposit: number
// }

// export class CreateDepositTransactionUseCase {
//     constructor(private usersRepository: UsersRepository, private transactionsRepository: TransactionRepository) { }
//     async execute({
//         userId,
//         amount,
//         transaction_type
//     }: createDepositTransactionUseCaseRequest): Promise<createDepositTransactionUseCaseResponse> {

//         if (transaction_type !== "DEPOSIT") {
//             throw new InvalidTransactionTypeError();
//         }
//         const user = await this.usersRepository.findById(userId)
//         if (!user) {
//             throw new NotFoundError()
//         }

//         try {
//             const transaction = await this.transactionsRepository.createDepositTransaction({
//                 amount,
//                 transaction_type: 'DEPOSIT',
//                 userId: user.id
//             })

//             await this.usersRepository.depositToUser(userId, amount)

//         } catch (error) {
//             console.error(error)
//         }
//         return { amountToDeposit: amount }

//     }
// }