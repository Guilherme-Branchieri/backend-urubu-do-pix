import { Prisma, User } from "@prisma/client";
import { UsersRepository } from "../users-repository";
import { prisma } from "@/lib/prisma";
import { GetResult } from "@prisma/client/runtime/library";

export class PrismaUsersRepository implements UsersRepository {
    async findById(id: string): Promise<User | null> {
        const user = await prisma.user.findFirstOrThrow({
            where: {
                id
            }
        })

        if(!user){
            return null;
        }

        return user
    }
    async getUserBalance(id: string): Promise<number> {
        throw new Error("Method not implemented.");
    }
    async findByEmail(email: string): Promise<User | null> {
        const user = await prisma.user.findFirst({
            where: { email }
        });
        if(!user) {
            return null
        }
        return user
    }
    async createUser(data: Prisma.UserCreateInput): Promise<User> {
        const user = await prisma.user.create({
            data
        })

        return user
    }
    }