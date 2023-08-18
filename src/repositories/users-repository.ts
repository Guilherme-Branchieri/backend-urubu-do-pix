import { User, } from "@prisma/client";
import { Prisma } from "@prisma/client";

export interface UsersRepository {
    createUser(data: Prisma.UserCreateInput): Promise<User>
    findByEmail(email: string): Promise<User | null>
    findById(userId: string): Promise<User | null>
    getUserBalance(userId: string): Promise<number>
    depositToUser(userId: string, amount: number): Promise<number | null>

}