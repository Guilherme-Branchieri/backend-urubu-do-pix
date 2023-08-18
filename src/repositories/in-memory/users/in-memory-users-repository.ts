import { Prisma, User } from "@prisma/client";
import { UsersRepository } from "../../users-repository";
import { randomUUID } from 'crypto'

export class InMemoryUsersRepository implements UsersRepository {
    private users: User[] = []

    getUsersForTests(user: User): User[] {
        this.users.push(user)
        return this.users
    }
    async addUserInvestment(email: string, amount: number): Promise<number | null> {
        throw new Error("Method not implemented.");
    }

    async findById(id: string): Promise<User | null> {
        const user = await this.users.find((user) => user.id === id)
        return user || null
    }
    async getUserBalance(id: string): Promise<number> {
        throw new Error("Method not implemented.");
    }
    async findByEmail(email: string): Promise<User | null> {
        const user = await this.users.find((user) => user.email === email)
        if (!user) {
            return null;
        }
        return user

    }
    async createUser(data: Prisma.UserCreateInput): Promise<User> {
        const user = {
            id: data.id ?? randomUUID(),
            name: data.name,
            email: data.email,
            balance: 0,
            invested: 0,
            password_hash: data.password_hash,
            created_at: new Date(),
            updated_at: null
        }
        await this.users.push(user)
        return user
    }

    async depositToUser(userId: string, amount: number): Promise<number | null> {
        await this.users.map((user) => {
            if (user.id === userId) {
                user.balance += amount
            }
        })
        return amount

    }

}