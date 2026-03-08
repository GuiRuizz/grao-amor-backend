import { Router } from "express";
import { ProductController } from "../products/infrastructure/http/controllers/ProductController.js";
import { createProductUseCase, getAllProductsUseCase, getProductByIdUseCase, updateProductUseCase, deleteProductUseCase } from "../products/factories/ProductUsecaseFactory.js";
import { authMiddleware, roleMiddleware } from "../auth/infrastructure/http/controllers/middleware/authMiddleware.js";


const router = Router();

const productController = new ProductController(
    createProductUseCase,
    getAllProductsUseCase,
    getProductByIdUseCase,
    updateProductUseCase,
    deleteProductUseCase
);

// Rotas
router.get("/", (req, res) => productController.getAll(req, res));

router.post("/", authMiddleware, roleMiddleware(["ADMIN"]), (req, res) => productController.create(req, res));
router.get("/:id", authMiddleware, (req, res) => productController.getById(req, res));
router.patch("/:id", authMiddleware, roleMiddleware(["ADMIN"]), (req, res) => productController.update(req, res));
router.delete("/:id", authMiddleware, roleMiddleware(["ADMIN"]), (req, res) => productController.delete(req, res));

export default router;