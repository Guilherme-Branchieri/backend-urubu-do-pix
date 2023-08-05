import { UsersRepository } from "@/repositories/users-repository";
import { NotFoundError } from "../errors/not-found-error";

interface getUserBalanceUseCaseRequest {
    email: string
}

interface getUserBalanceUseCaseResponse {
    balance: number
}

export class GetUserBalanceUseCase {
    constructor(private usersRepository: UsersRepository) { }
    async execute({
        email
    }: getUserBalanceUseCaseRequest): Promise<getUserBalanceUseCaseResponse> {
        const user = await this.usersRepository.findByEmail(email)
        if (!user) {
            throw new NotFoundError()
        }
        const balance = user.balance

        return { balance }

    }
}