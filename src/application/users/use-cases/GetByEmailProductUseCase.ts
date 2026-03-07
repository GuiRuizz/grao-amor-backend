import type { User } from "../../../domain/users/entities/User.js";
import type { IUserRepository } from "../../../domain/users/repositories/IUserRepository.js";
import { Logger } from "../../../utils/Logger.js";



const logger = new Logger("GetUserByEmailUseCase");
export class GetUserByEmailUseCase {
    private userRepo: IUserRepository;

    constructor(userRepo: IUserRepository) {
        this.userRepo = userRepo;
    }

    async execute(email: string): Promise<User | null> {
        // Validação simples
        if (!email || typeof email !== "string") {
            logger.warn("Invalid email provided");
            throw new Error("Email inválido.");
        }

        if (!email.includes("@")) {
            logger.warn("Email must contain '@'");
            throw new Error("Email deve conter '@'.");
        }

        // Busca o usuário no repositório
        const user = await this.userRepo.findByEmail(email);

        if (!user) {
            logger.info(`User with email ${email} not found`);
            throw new Error("Usuário não encontrado.");
        }

        logger.info(`User with email ${email} retrieved successfully`);

        return user;
    }
}