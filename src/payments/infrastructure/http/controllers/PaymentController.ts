import type { Request, Response } from "express";
import { Logger } from "../../../../utils/Logger.js";
import type { CreatePaymentUseCase } from "../../../application/use-cases/CreatePaymentUseCase .js";
import { AppError } from "../../../../utils/AppError.js";



const logger = new Logger("PaymentController");

export class PaymentController {
    constructor(private createPaymentUseCase: CreatePaymentUseCase) { }

    // POST /payments
    async create(req: Request, res: Response) {

        const { orderId } = req.body;

        const userId = req.userId; // vem do JWT

        if (!userId) {
            logger.warn("Invalid user ID provided");
            throw new AppError("ID do usuário inválido", 400);
        }
 
        const payment = await this.createPaymentUseCase.execute(orderId, userId);

        return res.status(201).json({
            checkoutUrl: payment.init_point,
            oprationType: payment.operation_type,
            paymentId: payment.id
        });

    }

    // GET /payments/:id
    async getById(req: Request, res: Response) {
        const paymentId = req.params.id;
        // Aqui você poderia chamar um use case que busca o pagamento no Mercado Pago
        // Ex.: this.getPaymentByIdUseCase.execute(paymentId)
        return res.status(200).json({ message: "Não implementado ainda", paymentId });
    }

    // POST /payments/webhook
    async webhook(req: Request, res: Response) {
        const body = req.body;

        // Aqui você processa notificações do Mercado Pago
        // Ex.: atualiza o status do pedido conforme o pagamento
        logger.info(`Webhook recebido ${JSON.stringify(body)}`);

        return res.status(200).json({ message: "Webhook recebido" });
    }
}