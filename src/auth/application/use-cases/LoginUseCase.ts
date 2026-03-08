import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dayjs from "dayjs";

import { AppError } from "../../../utils/AppError.js";
import { Logger } from "../../../utils/Logger.js";
import type { IUserRepository } from "../../../users/domain/repositories/IUserRepository.js";
import type { ITokenRepository } from "../../domain/repositories/IAuthRepository.js";


const logger = new Logger("LoginUseCase");

export class LoginUseCase {
    constructor(
        private userRepository: IUserRepository,
        private tokenRepository: ITokenRepository
    ) { }

    async execute(data: { email: string; password: string }) {
        const user = await this.userRepository.findByEmail(data.email);

        if (!user) {
            logger.warn(`Login attempt with non-existent email: ${data.email}`);
            throw new AppError("Invalid credentials", 401);
        }

        const passwordMatch = await bcrypt.compare(data.password, user.password);

        if (!passwordMatch) {
            logger.warn(`Invalid password attempt for email: ${data.email}`);
            throw new AppError("Invalid credentials", 401);
        }

        // 1️⃣ Gera o access token
        const accessToken = jwt.sign(
            { userId: user.id, role: user.type },
            process.env.JWT_SECRET!,
            { expiresIn: "15m" }
        );

        // 2️⃣ Gera o refresh token
        const refreshToken = jwt.sign(
            { userId: user.id, role: user.type },
            process.env.JWT_REFRESH_SECRET!,
            { expiresIn: "7d" }
        );

        // 3️⃣ Salva o refresh token no banco
        await this.tokenRepository.saveRefreshToken(user.id, refreshToken);

        logger.info(`User logged in successfully: ${user.id}`);

        // 4️⃣ Retorna os tokens
        return {
            accessToken,
            refreshToken
        };
    }
}