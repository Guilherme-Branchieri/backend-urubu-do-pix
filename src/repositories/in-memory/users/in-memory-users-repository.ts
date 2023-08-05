import { Prisma, User } from "@prisma/client";
import { UsersRepository } from "../../users-repository";
import { randomUUID } from 'crypto'
import { GetResult } from "@prisma/client/runtime/library";

export class InMemoryUsersRepository implements UsersRepository {
    public users: User[] = []

    async findById(id: string): Promise<User | null> {
        const user = await this.users.find((user) => {
            user.id === id 
        })
        if(!user){
            return null
        }
        return user
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
            balance: data.balance ?? 0,
            password_hash: data.password_hash,
            created_at: new Date(),
            updated_at: null
        }
        this.users.push(user)
        console.log(user)
        return user
    }

}