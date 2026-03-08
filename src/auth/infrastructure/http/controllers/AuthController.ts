import type { Request, Response } from "express"

import type { LoginUseCase } from "../../../application/use-cases/LoginUseCase.js"


import { Logger } from "../../../../utils/Logger.js"
import type { ForgotPasswordUseCase } from "../../../application/use-cases/ForgotPassordUsecase.js";
import type { RefreshTokenUseCase } from "../../../application/use-cases/RefreshUseCase.js";
import type { ResetPasswordUseCase } from "../../../application/use-cases/ResetPasswordUseCase.js";

const logger = new Logger("AuthController");

export class AuthController {

    constructor(
        private loginUseCase: LoginUseCase,
        private refreshTokenUseCase: RefreshTokenUseCase,
        private forgotPasswordUseCase: ForgotPasswordUseCase,
        private resetPasswordUseCase: ResetPasswordUseCase
    ) { }

    async login(req: Request, res: Response) {

        const { email, password } = req.body;

        const tokens = await this.loginUseCase.execute({
            email,
            password
        });

        logger.info(`User with email ${email} logged in successfully`);

        return res.status(200).json(tokens);
    }

    async refreshToken(req: Request, res: Response) {

        const { refreshToken } = req.body;

        if (!refreshToken) {
            logger.warn("Refresh token not provided");
            return res.status(400).json({ message: "Refresh token é obrigatório" });
        }

        const token = await this.refreshTokenUseCase.execute(refreshToken);

        logger.info("Access token refreshed successfully");

        return res.status(200).json(token);
    }

    async forgotPassword(req: Request, res: Response) {

        const { email } = req.body;

        const result = await this.forgotPasswordUseCase.execute(email);

        logger.info(`Password reset requested for email ${email}`);

        return res.status(200).json(result);
    }

    async resetPassword(req: Request, res: Response) {

        const { token, newPassword } = req.body;

        await this.resetPasswordUseCase.execute({
            token,
            newPassword
        });

        logger.info("Password reset successfully");

        return res.status(200).json({
            message: "Senha alterada com sucesso"
        });
    }
}