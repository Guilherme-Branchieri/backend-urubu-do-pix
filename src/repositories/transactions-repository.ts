import { Transaction } from "@prisma/client";
import { Prisma } from "@prisma/client";
export interface TransactionRepository {
    createDepositTransaction({userId, amount}: Prisma.TransactionUncheckedCreateInput): Promise<Transaction>
    createProfitTransaction(data: Prisma.TransactionCreateInput): void
    createWithdrawTransaction(data: {userId: string, amount: number}): Promise<number>

}