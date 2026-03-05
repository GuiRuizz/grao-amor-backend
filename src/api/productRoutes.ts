import { Router } from "express";

import { ProductController } from "../infrastructure/products/http/controllers/ProductController.js";
import { createProductUseCase, deleteProductUseCase, getAllProductsUseCase, getProductByIdUseCase, updateProductUseCase } from "../main/factories/ProductUsecaseFactory.js";

const router = Router();

const productController = new ProductController(
    createProductUseCase,
    getAllProductsUseCase,
    getProductByIdUseCase,
    updateProductUseCase,
    deleteProductUseCase
);

// Rotas
router.post("/", (req, res) => productController.create(req, res));
router.get("/", (req, res) => productController.getAll(req, res));
router.get("/:id", (req, res) => productController.getById(req, res));
router.patch("/:id", (req, res) => productController.update(req, res));
router.delete("/:id", (req, res) => productController.delete(req, res));

export default router;