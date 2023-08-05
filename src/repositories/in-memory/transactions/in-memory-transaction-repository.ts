import { TransactionRepository } from "@/repositories/transaction-repository";
import { Prisma, Transaction } from "@prisma/client";
import { randomUUID } from 'node:crypto'


export class InMemoryTransactionsRepository implements TransactionRepository {
    constructor(private transactionsRepository: TransactionRepository) { }

    public transactions: Transaction[] = []
    public account = { balance: 0 }

    async addDeposit(data: Prisma.TransactionCreateInput): Promise<Transaction> {
        const deposit = {
            order_id: data.order_id ?? randomUUID(),
            transaction_type: data.transaction_type,
            value: data.value,
            created_at: new Date(),
            updated_at: null
        }
        this.transactions.push(deposit)
        this.account.balance = deposit.value

        return deposit
    }
    addProfit(data: Prisma.TransactionCreateInput): void {
        data
    }
    async getBalance(userId: string): Promise<number> {
        throw new Error("Method not implemented.");
    }
    async withdraw(userId: string, amount: number): Promise<number> {
        throw new Error("Method not implemented.");
    }


}