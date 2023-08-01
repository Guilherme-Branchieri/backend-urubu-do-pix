import { Prisma, User } from "@prisma/client";
import { UsersRepository } from "../users-repository";
import { randomUUID } from 'crypto'

export class InMemoryUsersRepository implements UsersRepository {
    public users: User[] = []
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
            password_hash: data.password_hash,
            created_at: new Date(),
            updated_at: null
        }
        this.users.push(user)
        console.log(user)
        return user
    }

}