import { Router } from "express";
import { authMiddleware, roleMiddleware } from "../auth/infrastructure/http/controllers/middleware/authMiddleware.js";
import { OrderController } from "../orders/infrastructure/http/controllers/OrderController.js";
import { createOrderUseCase, deleteOrderUseCase, getOrderByIdUseCase, getAllOrdersUseCase, updateOrderUseCase, getMyOrdersUseCase } from "../orders/factories/OrderUsecaseFactory.js";

const router = Router();

const orderController = new OrderController(
    createOrderUseCase,
    deleteOrderUseCase,
    getOrderByIdUseCase,
    getAllOrdersUseCase,
    updateOrderUseCase,
    getMyOrdersUseCase
);

// Rotas
router.post(
    "/",
    authMiddleware,
    (req, res) => orderController.create(req, res)
);

router.get(
    "/",
    authMiddleware,
    roleMiddleware(["ADMIN"]),
    (req, res) => orderController.getAll(req, res)
);

router.get(
    "/my-orders",
    authMiddleware,
    (req, res) => orderController.getMyOrders(req, res)
);

router.get(
    "/:id",
    authMiddleware,
    roleMiddleware(["ADMIN"]),
    (req, res) => orderController.getById(req, res)
);

router.patch(
    "/:id/status",
    authMiddleware,
    roleMiddleware(["ADMIN"]),
    (req, res) => orderController.updateStatus(req, res)
);

router.delete(
    "/:id",
    authMiddleware,
    (req, res) => orderController.delete(req, res)
);

export default router;