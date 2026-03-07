import type { User } from "../../../domain/users/entities/User.js";
import type { IUserRepository } from "../../../domain/users/repositories/IUserRepository.js";



export class GetUserByEmailUseCase {
    private userRepo: IUserRepository;

    constructor(userRepo: IUserRepository) {
        this.userRepo = userRepo;
    }

    async execute(email: string): Promise<User | null> {
        // Validação simples
        if (!email || typeof email !== "string") {
            throw new Error("Email inválido.");
        }

        if (!email.includes("@")) {
            throw new Error("Email deve conter '@'.");
        }

        // Busca o usuário no repositório
        const user = await this.userRepo.findByEmail(email);

        if (!user) {
            throw new Error("Usuário não encontrado.");
        }

        return user;
    }
}