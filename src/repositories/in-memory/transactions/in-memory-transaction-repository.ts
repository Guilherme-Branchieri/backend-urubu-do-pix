import { TransactionRepository } from "@/repositories/transactions-repository";
import { Prisma, Transaction } from "@prisma/client";
import { randomUUID } from 'node:crypto'


export class InMemoryTransactionsRepository implements TransactionRepository {
    constructor(
        private transactions: Transaction[] = [],
    ) { }
    createWithdrawTransaction(data: { userId: string; amount: number; }): Promise<number> {
        throw new Error("Method not implemented.");
    }

    async createDepositTransaction(data: Prisma.TransactionUncheckedCreateInput): Promise<Transaction> {
        const transaction = {
            order_id: randomUUID(),
            transaction_type: data.transaction_type,
            amount: data.amount,
            created_at: new Date(),
            updated_at: null,
            userId: data.userId,
        }
        this.transactions.push(transaction)
        return transaction

    }
    createProfitTransaction(data: Prisma.TransactionCreateInput): void {
    }



}