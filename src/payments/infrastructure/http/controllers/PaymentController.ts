import type { Request, Response } from "express";
import { Logger } from "../../../../utils/Logger.js";
import type { CreatePaymentUseCase } from "../../../application/use-cases/CreatePaymentUseCase .js";
import { AppError } from "../../../../utils/AppError.js";
import type { GetAllPaymentsUseCase } from "../../../application/use-cases/GetAllPaymentsUseCase.js";
import type { GetPaymentsByIdUseCase } from "../../../application/use-cases/GetPaymentsByIdUseCase.js";
import type { UpdatePaymentStatusUseCase } from "../../../application/use-cases/UpdateStatusUseCase.js";
import type { GetPaymentProviderUseCase } from "../../../application/use-cases/GetPaymentProviderUseCase .js";
import type { GetPaymentByProviderIdUseCase } from "../../../application/use-cases/GetPaymentByProviderIdUseCase.js";
import { mapStatus } from "../../../application/dto/PaymentMapper.js";



const logger = new Logger("PaymentController");

export class PaymentController {
    constructor(
        private createPaymentUseCase: CreatePaymentUseCase,
        private getAllPaymentsUseCase: GetAllPaymentsUseCase,
        private getPaymentsByIdUseCase: GetPaymentsByIdUseCase,
        private getPaymentProviderUseCase: GetPaymentProviderUseCase,
        private getPaymentByProviderIdUseCase: GetPaymentByProviderIdUseCase,
        private updatePaymentStatusUseCase: UpdatePaymentStatusUseCase
    ) { }

    // POST /payments
    async create(req: Request, res: Response) {

        const { orderId } = req.body;

        const userId = req.userId; // vem do JWT

        if (!userId) {
            logger.warn("Invalid user ID provided");
            throw new AppError("ID do usuário inválido", 400);
        }

        const payment = await this.createPaymentUseCase.execute(orderId, userId);

        if (payment.alreadyExists) {
            return res.status(200).json(payment);
        }

        return res.status(201).json({
            checkoutUrl: payment.init_point,
            paymentId: payment.id
        });

    }

    // GET /payments/:id
    async getById(req: Request, res: Response) {

        const paymentId = Array.isArray(req.params.id)
            ? req.params.id[0]
            : req.params.id;

        if (!paymentId) {
            throw new AppError("Payment Id não encontrado", 404);
        }

        const payment = await this.getPaymentsByIdUseCase.execute(paymentId);

        return res.status(200).json(payment);
    }

    async getAllPayments(req: Request, res: Response) {

        const paymentSearch = await this.getAllPaymentsUseCase.execute();

        return res.status(200).json(paymentSearch);

    }

    // POST /payments/webhook

    async webhook(req: Request, res: Response) {

        const { type, data } = req.body;

        if (type !== "payment") {
            return res.status(200).send("Ignored");
        }

        const providerPaymentId = String(data.id);

        console.log("Webhook paymentId:", providerPaymentId);

        // busca no MercadoPago
        const mpPayment = await this.getPaymentProviderUseCase.execute(providerPaymentId);

        const status = mapStatus(mpPayment.status!);

        // busca payment no banco
        const payment = await this.getPaymentByProviderIdUseCase.execute(providerPaymentId);

        if (!payment) {
            console.log('Payment: ', payment);
            throw new AppError("Não achou o payment");
        }

        // atualiza usando ID do banco
        await this.updatePaymentStatusUseCase.execute(payment.id, status);

        return res.status(200).send("OK");
    }
}