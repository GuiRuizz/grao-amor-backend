import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import type { IUserRepository } from "../../../users/domain/repositories/IUserRepository.js";
import { AppError } from "../../../utils/AppError.js";

export class ResetPasswordUseCase {

    constructor(
        private userRepository: IUserRepository
    ) { }

    async execute(data: { token: string; newPassword: string }) {

        const { token, newPassword } = data;

        const decoded = jwt.verify(
            token,
            process.env.JWT_RESET_SECRET!
        ) as { userId: string };

        const user = await this.userRepository.findById(decoded.userId);

        if (!user) {
            throw new AppError("User not found", 404);
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await this.userRepository.updatePassword(user.id, hashedPassword);

        return {
            message: "Password updated successfully"
        };
    }
}