import { Router } from "express";
import { PaymentController } from "../payments/infrastructure/http/controllers/PaymentController.js";
import { createPaymentUseCase, getAllPayemntsUseCase, getPaymentByProviderIdUseCase, getPaymentProviderUseCase, getPaymentsByIdUseCase, updatePaymentStatusUseCase } from "../payments/factories/PaymentUsecaseFactory.js";
import { authMiddleware, roleMiddleware } from "../auth/infrastructure/http/controllers/middleware/authMiddleware.js";



const router = Router();
const paymentController = new PaymentController(
    createPaymentUseCase,
    getAllPayemntsUseCase,
    getPaymentsByIdUseCase,
    getPaymentProviderUseCase,
    getPaymentByProviderIdUseCase,
    updatePaymentStatusUseCase,
);

router.post("/", authMiddleware, (req, res) => paymentController.create(req, res));
router.get("/:id", authMiddleware, (req, res) => paymentController.getById(req, res));
router.get("/", authMiddleware, roleMiddleware(["ADMIN"]), (req, res) => paymentController.getAllPayments(req, res));
router.post("/webhook", authMiddleware, (req, res) => paymentController.webhook(req, res));

export default router;