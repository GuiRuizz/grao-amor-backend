
import type { IUserRepository } from "../../domain/repositories/IUserRepository.js";
import { Logger } from "../../../utils/Logger.js";
import type { User } from "../../domain/entities/User.js";



const logger = new Logger("GetUserByIdUseCase");

export class GetUserByIdUseCase {
    private userRepo: IUserRepository;

    constructor(userRepo: IUserRepository) {
        this.userRepo = userRepo;
    }

    async execute(id: string): Promise<User | null> {
        // Validação simples
        if (!id || typeof id !== "string") {
            logger.warn("Invalid ID provided");
            throw new Error("ID inválido.");
        }

        // Busca o usuário no repositório
        const user = await this.userRepo.findById(id);

        if (!user) {
            logger.info(`User with ID ${id} not found`);
            throw new Error("Usuário não encontrado.");
        }

        return user;
    }
}