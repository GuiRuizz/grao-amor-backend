import { Router } from "express";
import { UserController } from "../users/infrastructure/http/controllers/UserController.js";
import { createUserUseCase, getAllUsersUseCase, getUserByIdUseCase, updateUserUseCase, deleteUserUseCase, getUserByEmailUseCase } from "../users/factories/UserUsecaseFactory.js";
import { authMiddleware, roleMiddleware } from "../auth/infrastructure/http/controllers/middleware/authMiddleware.js";
import { uploadAvatar } from "../utils/middleware/upload.js";

const router = Router();

const userController = new UserController(
    createUserUseCase,
    getAllUsersUseCase,
    getUserByIdUseCase,
    updateUserUseCase,
    deleteUserUseCase,
    getUserByEmailUseCase,
);

// Rotas
router.post("/", (req, res) => userController.create(req, res));

router.get("/", authMiddleware, roleMiddleware(["ADMIN"]), (req, res) => userController.getAll(req, res));
router.get("/:id", authMiddleware, (req, res) => userController.getById(req, res));
router.get("/email/:email", authMiddleware, (req, res) => userController.getByEmail(req, res));
router.patch("/:id", authMiddleware, uploadAvatar.single("avatar"), (req, res) => userController.update(req, res));
router.delete("/:id", authMiddleware, roleMiddleware(["ADMIN"]), (req, res) => userController.delete(req, res));

export default router;