import { Router } from "express";

import { authMiddleware, roleMiddleware } from "../auth/infrastructure/http/controllers/middleware/authMiddleware.js";
import { createCategoryUseCase, deleteCategoryUseCase, getAllCategoriesUseCase, getCategoryByIdUseCase, updateCategoryUseCase } from "../categories/factories/CategoryUsecaseFactory.js";
import { CategoryController } from "../categories/infrastructure/http/controllers/CategoryController.js";


const router = Router();

const categoryController = new CategoryController(
    createCategoryUseCase,
    getAllCategoriesUseCase,
    getCategoryByIdUseCase,
    updateCategoryUseCase,
    deleteCategoryUseCase
);

// Rotas
router.get("/", authMiddleware, (req, res) => categoryController.getAll(req, res));
router.get("/:id", authMiddleware, (req, res) => categoryController.getById(req, res));

router.post("/", authMiddleware, roleMiddleware(["ADMIN"]), (req, res) => categoryController.create(req, res));
router.patch("/:id", authMiddleware, roleMiddleware(["ADMIN"]), (req, res) => categoryController.update(req, res));
router.delete("/:id", authMiddleware, roleMiddleware(["ADMIN"]), (req, res) => categoryController.delete(req, res));

export default router;