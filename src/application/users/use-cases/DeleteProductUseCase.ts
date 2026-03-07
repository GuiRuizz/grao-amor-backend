import type { User } from "../../../domain/users/entities/User.js";
import type { IUserRepository } from "../../../domain/users/repositories/IUserRepository.js";
import { createLogger } from "../../../utils/factories/LoggerFactory.js";
import { Logger } from "../../../utils/Logger.js";


export class DeleteUserUseCase {
    private userRepo: IUserRepository;
    private logger = createLogger();

    constructor(userRepo: IUserRepository) {
        this.userRepo = userRepo;
    }

    async execute(id: string): Promise<User | null> {
        // Validação simples
        if (!id || typeof id !== "string") {
            this.logger.warn("Invalid ID provided");
            throw new Error("ID inválido.");
        }

        // Busca o usuário no repositório
        const user = await this.userRepo.findById(id);

        if (!user) {
            this.logger.warn(`User with ID ${id} not found`);
            throw new Error("Usuário não encontrado.");
        }

        // Deleta o usuário
        await this.userRepo.delete(id);
        this.logger.info(`User with ID ${id} deleted successfully`);

        // Retorna o usuário deletado (opcional, útil para logs ou confirmação)
        return user;
    }
}