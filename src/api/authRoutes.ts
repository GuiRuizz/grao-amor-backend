import { Router } from "express";
import { AuthController } from "../auth/infrastructure/http/controllers/AuthController.js";
import { loginUseCase, refreshTokenUseCase, forgotPasswordUseCase, resetPasswordUseCase } from "../auth/factories/AuthUsecaseFactory.js";

const router = Router();

const controller = new AuthController(loginUseCase, refreshTokenUseCase, forgotPasswordUseCase, resetPasswordUseCase);

router.post("/login", (req, res) => controller.login(req, res));
router.post("/refresh-token", (req, res) => controller.refreshToken(req, res));
router.post("/forgot-password", (req, res) => controller.forgotPassword(req, res));
router.post("/reset-password", (req, res) => controller.resetPassword(req, res));

export default router;