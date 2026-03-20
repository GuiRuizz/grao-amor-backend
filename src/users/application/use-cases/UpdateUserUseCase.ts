
import type { IUserRepository } from "../../domain/repositories/IUserRepository.js";
import { Logger } from "../../../utils/Logger.js";
import type { UserResponseDTO } from "../dto/UserDTO.js";
import type { User } from "../../domain/entities/User.js";
import { AppError } from "../../../utils/AppError.js";

const logger = new Logger("UpdateUserUseCase");
export class UpdateUserUseCase {
    private userRepo: IUserRepository;

    constructor(userRepo: IUserRepository) {
        this.userRepo = userRepo;
    }

    async execute(id: string, data: UserResponseDTO): Promise<User | null> {
        if (!id || typeof id !== "string") {
            logger.warn("Invalid ID provided");
            throw new AppError("ID inválido.");
        }

        if (!data || Object.keys(data).length === 0) {
            logger.warn("No data provided for update");
            throw new AppError("Nenhum dado para atualizar.");
        }

        const user = await this.userRepo.findById(id);

        if (!user) {
            logger.info(`User with ID ${id} not found`);
            throw new AppError("Usuário não encontrado.");
        }

        if (data.email && data.email !== user.email) {
            const existingUser = await this.userRepo.findByEmail(data.email);

            if (existingUser) {
                throw new AppError("Email já está em uso.");
            }
        }

        // 👇 só atualiza campos permitidos
        const updatedData: Partial<User> = {
            name: data.name ?? user.name,
            email: data.email ?? user.email,
            profilePhoto: data.profilePhoto ?? user.profilePhoto,
        };

        const updatedUser = await this.userRepo.update(id, updatedData);

        logger.info(`User with ID ${id} updated successfully`);

        return updatedUser;
    }
}