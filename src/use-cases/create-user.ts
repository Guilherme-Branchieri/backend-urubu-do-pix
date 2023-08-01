import { UsersRepository } from "@/repositories/users-repository";
import { User } from "@prisma/client";
import { EmailAlreadyExistsError } from "./errors/email-already-exists-error";
import bcrypt from "bcryptjs"

interface CreateUserUseCaseRequest {
    name: string
    email: string
    password: string
}

interface CreateUserUseCaseResponse {
    user: User
}

export class CreateUserUseCase {
    constructor(private usersRepository: UsersRepository) { }
    async execute({
        name,
        email,
        password,
    }: CreateUserUseCaseRequest): Promise<CreateUserUseCaseResponse> {
        const password_hash = await bcrypt.hash(password, 6);
        const isEmailAlreadyRegistered = await this.usersRepository.findByEmail(email);

        if (isEmailAlreadyRegistered) {
            throw new EmailAlreadyExistsError()
        }
        const user = await this.usersRepository.createUser({
            name,
            email,
            password_hash
        })

        return { user }
    }
}