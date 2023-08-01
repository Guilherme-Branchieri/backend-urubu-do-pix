import { User,  } from "@prisma/client";
import { Prisma } from "@prisma/client";

export interface UsersRepository {
    createUser(data: Prisma.UserCreateInput): Promise<User>
    findByEmail(email: string): Promise<User | null>
}