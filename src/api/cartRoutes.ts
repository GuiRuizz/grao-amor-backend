import { Router } from "express";

import { authMiddleware } from "../auth/infrastructure/http/controllers/middleware/authMiddleware.js";



import { CartController } from "../cart/infrastructure/http/controllers/CartController.js";
import { addItemToCartUseCase, clearCartUseCase, createCartUseCase, getCartsUseCase, removeItemFromCartUseCase, updateItemInCartUseCase } from "../cart/factories/CartUsecaseFactory.js";


const router = Router();

const cartController = new CartController(
    createCartUseCase,
    getCartsUseCase,
    addItemToCartUseCase,
    updateItemInCartUseCase,
    removeItemFromCartUseCase,
    clearCartUseCase,
);


// Rotas
router.get("/", authMiddleware, (req, res) =>
    cartController.getCart(req, res)
);

router.post("/items", authMiddleware, (req, res) =>
    cartController.addItem(req, res)
);

router.patch("/items", authMiddleware, (req, res) =>
    cartController.updateItem(req, res)
);

router.delete("/items/:productId", authMiddleware, (req, res) =>
    cartController.removeItem(req, res)
);

router.delete("/clear", authMiddleware, (req, res) =>
    cartController.clear(req, res)
);

export default router;