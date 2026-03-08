import type { IUserRepository } from "../../domain/repositories/IUserRepository.js";
import { Logger } from "../../../utils/Logger.js";
import bcrypt from "bcrypt";
import { AppError } from "../../../utils/AppError.js";
import type { User } from "../../domain/entities/User.js";

const logger = new Logger("UpdatePasswordUserUseCase");

export class UpdatePasswordUserUseCase {
    private userRepo: IUserRepository;

    constructor(userRepo: IUserRepository) {
        this.userRepo = userRepo;
    }

    async execute(id: string, newPassword: string): Promise<User> {

        if (!id || typeof id !== "string") {
            logger.warn("Invalid ID provided");
            throw new AppError("ID inválido.", 400);
        }

        if (!newPassword || typeof newPassword !== "string") {
            logger.warn("Invalid new password provided");
            throw new AppError("Nova senha inválida.", 400);
        }

        const user = await this.userRepo.findById(id);

        if (!user) {
            logger.info(`User with ID ${id} not found`);
            throw new AppError("Usuário não encontrado.", 404);
        }

        // hash da senha
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await this.userRepo.updatePassword(id, hashedPassword);

        logger.info(`Password updated for user ${id}`);

        return {
            ...user,
            password: hashedPassword
        };
    }
}