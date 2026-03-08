import jwt from "jsonwebtoken";
import dayjs from "dayjs";

import type { IUserRepository } from "../../../users/domain/repositories/IUserRepository.js";

import { AppError } from "../../../utils/AppError.js";
import { Logger } from "../../../utils/Logger.js";
import type { ITokenRepository } from "../../domain/repositories/IAuthRepository.js";

const logger = new Logger("RefreshTokenUseCase");

export class RefreshTokenUseCase {
    constructor(
        private userRepository: IUserRepository,
        private tokenRepository: ITokenRepository
    ) { }

    async execute(refreshToken: string) {
        if (!refreshToken) {
            throw new AppError("Refresh token is required", 400);
        }

        // 1️⃣ Verifica se o refresh token existe no banco
        const savedToken = await this.tokenRepository.findRefreshToken(refreshToken);
        if (!savedToken) {
            throw new AppError("Invalid refresh token", 401);
        }

        // 2️⃣ Decodifica o refresh token
        let decoded: { userId: string };
        try {
            decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET!) as { userId: string };
        } catch (err) {
            // Remove token inválido do banco
            await this.tokenRepository.deleteRefreshToken(refreshToken);
            throw new AppError("Invalid or expired refresh token", 401);
        }

        // 3️⃣ Busca o usuário
        const user = await this.userRepository.findById(decoded.userId);
        if (!user) {
            throw new AppError("User not found", 404);
        }

        // 4️⃣ Gera um novo access token
        const accessToken = jwt.sign(
            { userId: user.id, role: user.type },
            process.env.JWT_SECRET!,
            { expiresIn: "15m" }
        );

        // 5️⃣ Opcional: gera um novo refresh token e substitui o antigo
        const newRefreshToken = jwt.sign(
            { userId: user.id, role: user.type },
            process.env.JWT_REFRESH_SECRET!,
            { expiresIn: "7d" }
        );
        await this.tokenRepository.saveRefreshToken(user.id, newRefreshToken);
        await this.tokenRepository.deleteRefreshToken(refreshToken); // remove o antigo

        logger.info(`Refresh token rotated for user: ${user.id}`);

        return {
            accessToken,
            refreshToken: newRefreshToken
        };
    }
}