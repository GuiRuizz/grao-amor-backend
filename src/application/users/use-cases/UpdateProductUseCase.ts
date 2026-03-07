import type { User } from "../../../domain/users/entities/User.js";
import type { IUserRepository } from "../../../domain/users/repositories/IUserRepository.js";
import { createLogger } from "../../../utils/factories/LoggerFactory.js";
import type { UserResponseDTO } from "../dto/UserDTO.js";

export class UpdateUserUseCase {
    private userRepo: IUserRepository;
    private logger = createLogger();

    constructor(userRepo: IUserRepository) {
        this.userRepo = userRepo;
    }

    async execute(id: string, data: UserResponseDTO): Promise<User | null> {
        // Validação básica
        if (!id || typeof id !== "string") {
            throw new Error("ID inválido.");
            this.logger.warn("Invalid ID provided");
        }

        if (!data || Object.keys(data).length === 0) {
            this.logger.warn("No data provided for update");
            throw new Error("Nenhum dado para atualizar.");
        }

        // Busca o usuário no repositório
        const user = await this.userRepo.findById(id);

        if (!user) {
            this.logger.info(`User with ID ${id} not found`);
            throw new Error("Usuário não encontrado.");
        }

        // Atualiza os campos do usuário
        const updatedUser = { ...user, ...data };

        // Salva no repositório
        await this.userRepo.update(id, updatedUser);
        this.logger.info(`User with ID ${id} updated successfully`);
        return updatedUser;
    }
}