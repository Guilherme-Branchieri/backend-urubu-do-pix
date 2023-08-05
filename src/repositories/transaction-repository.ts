import { Transaction } from "@prisma/client";
import { Prisma } from "@prisma/client";
export interface TransactionRepository {
    addDeposit(data: Prisma.TransactionCreateInput): Promise<Transaction>
    addProfit(data: Prisma.TransactionCreateInput): void
    getBalance(userId: string): Promise<number>
    withdraw(userId: string, amount: number): Promise<number>
}