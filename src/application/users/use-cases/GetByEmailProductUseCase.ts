import type { User } from "../../../domain/users/entities/User.js";
import type { IUserRepository } from "../../../domain/users/repositories/IUserRepository.js";
import { createLogger } from "../../../utils/factories/LoggerFactory.js";



export class GetUserByEmailUseCase {
    private userRepo: IUserRepository;
    private logger = createLogger();

    constructor(userRepo: IUserRepository) {
        this.userRepo = userRepo;
    }

    async execute(email: string): Promise<User | null> {
        // Validação simples
        if (!email || typeof email !== "string") {
            this.logger.warn("Invalid email provided");
            throw new Error("Email inválido.");
        }

        if (!email.includes("@")) {
            this.logger.warn("Email must contain '@'");
            throw new Error("Email deve conter '@'.");
        }

        // Busca o usuário no repositório
        const user = await this.userRepo.findByEmail(email);

        if (!user) {
            this.logger.info(`User with email ${email} not found`);
            throw new Error("Usuário não encontrado.");
        }

        this.logger.info(`User with email ${email} retrieved successfully`);

        return user;
    }
}