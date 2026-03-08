import { LoginUseCase } from "../application/use-cases/LoginUseCase.js";


import { PrismaUserRepository } from "../../users/infrastructure/repositories/PrismaUserRespository.js";
import { Logger } from "../../utils/Logger.js";
import { RefreshTokenUseCase } from "../application/use-cases/RefreshUseCase.js";
import { ForgotPasswordUseCase } from "../application/use-cases/ForgotPassordUsecase.js";
import { ResetPasswordUseCase } from "../application/use-cases/ResetPasswordUseCase.js";
import { PrismaTokenRepository } from "../infrastructure/repositories/PrismaTokenRespository.js";

const logger = new Logger("AuthUsecaseFactory");

// reutiliza o mesmo repository
const userRepository = new PrismaUserRepository();
const tokenRepository = new PrismaTokenRepository();

// instancia os use cases
export const loginUseCase = new LoginUseCase(userRepository, tokenRepository);
export const refreshTokenUseCase = new RefreshTokenUseCase(userRepository, tokenRepository);
export const forgotPasswordUseCase = new ForgotPasswordUseCase(userRepository);
export const resetPasswordUseCase = new ResetPasswordUseCase(userRepository);

logger.info("Auth Use Cases initialized successfully");