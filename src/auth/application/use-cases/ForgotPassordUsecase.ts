import jwt from "jsonwebtoken";
import dayjs from "dayjs";

import type { IUserRepository } from "../../../users/domain/repositories/IUserRepository.js";
import { AppError } from "../../../utils/AppError.js";
import { Logger } from "../../../utils/Logger.js";

const logger = new Logger("ForgotPasswordUseCase");

export class ForgotPasswordUseCase {
    constructor(private userRepository: IUserRepository) { }

    async execute(email: string) {
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new AppError("User not found", 404);
        }

        // Gera token de reset
        const resetToken = jwt.sign(
            { userId: user.id, role: user.type },
            process.env.JWT_RESET_SECRET!,
            { expiresIn: "1h" }
        );

        logger.info(`Password reset token generated for user: ${user.id}`);

        // Aqui você enviaria email
        // emailService.sendResetPassword(user.email, resetToken);

        // TODO: Para teste, podemos retornar o token (não em produção)
        return {
            message: "Password reset email sent",
            resetToken
        };
    }
}