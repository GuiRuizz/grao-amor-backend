import { Router } from "express";
import { UserController } from "../infrastructure/users/http/controllers/UserConroller.js";
import { createUserUseCase, deleteUserUseCase, getAllUsersUseCase, getUserByIdUseCase, updateUserUseCase } from "../main/factories/UserUsecaseFactory.js";

const router = Router();

const userController = new UserController(
    createUserUseCase,
    getAllUsersUseCase,
    getUserByIdUseCase,
    updateUserUseCase,
    deleteUserUseCase
);

// Rotas
router.post("/", (req, res) => userController.create(req, res));
router.get("/", (req, res) => userController.getAll(req, res));
router.get("/:id", (req, res) => userController.getById(req, res));
router.patch("/:id", (req, res) => userController.update(req, res));
router.delete("/:id", (req, res) => userController.delete(req, res));

export default router;