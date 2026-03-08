
import type { IUserRepository } from "../../domain/repositories/IUserRepository.js";
import { Logger } from "../../../utils/Logger.js";
import type { UserResponseDTO } from "../dto/UserDTO.js";
import type { User } from "../../domain/entities/User.js";

const logger = new Logger("UpdateUserUseCase");
export class UpdateUserUseCase {
    private userRepo: IUserRepository;

    constructor(userRepo: IUserRepository) {
        this.userRepo = userRepo;
    }

    async execute(id: string, data: UserResponseDTO): Promise<User | null> {
        // Validação básica
        if (!id || typeof id !== "string") {
            logger.warn("Invalid ID provided");
            throw new Error("ID inválido.");
        }

        if (!data || Object.keys(data).length === 0) {
            logger.warn("No data provided for update");
            throw new Error("Nenhum dado para atualizar.");
        }

        // Busca o usuário no repositório
        const user = await this.userRepo.findById(id);

        if (!user) {
            logger.info(`User with ID ${id} not found`);
            throw new Error("Usuário não encontrado.");
        }

        // Atualiza os campos do usuário
        const updatedUser = { ...user, ...data };

        // Salva no repositório
        await this.userRepo.update(id, updatedUser);
        logger.info(`User with ID ${id} updated successfully`);
        return updatedUser;
    }
}