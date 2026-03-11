import { MercadoPagoConfig, Preference } from "mercadopago";
import type { IOrdersRepository } from "../../../orders/domain/repositories/IOrdersRepository.js";
import type { IUserRepository } from "../../../users/domain/repositories/IUserRepository.js";
import type { IProductRepository } from "../../../products/domain/repositories/IProductRepository.js";
import type { IPaymentsRepository } from "../../domain/repositories/IPaymentRepository.js";
import { AppError } from "../../../utils/AppError.js";
import { Logger } from "../../../utils/Logger.js";
import { Payment } from "../../domain/entities/Payment.js";
import { PaymentStatus } from "../../../../generated/prisma/enums.js";

const logger = new Logger("CreatePaymentUseCase");

export class CreatePaymentUseCase {
    constructor(
        private orderRepository: IOrdersRepository,
        private userRepository: IUserRepository,
        private productRepository: IProductRepository,
        private paymentRepository: IPaymentsRepository,
        private client: MercadoPagoConfig,
    ) { }

    async execute(orderId: string, userId: string) {

        const order = await this.orderRepository.findById(orderId);
        const user = await this.userRepository.findById(userId);

        if (!order) {
            throw new AppError("Pedido não encontrado");
        }

        if (!user) {
            throw new AppError("Usuário não encontrado");
        }

        const products = await Promise.all(
            order.items.map(item => this.productRepository.findById(item.productId))
        );

        const items = order.items.map((item, index) => ({
            id: item.productId,
            title: products[index]?.name ?? "Produto",
            quantity: item.quantity,
            unit_price: item.price
        }));

        const existingPayment = await this.paymentRepository.findPendingByOrderId(order.id);

        if (existingPayment) {
            logger.info("Payment already exists");

            return {
                alreadyExists: true,
                message: "Pagamento já criado",
                paymentId: existingPayment.id
            };
        }

        const preference = new Preference(this.client);

        const payment = await preference.create({
            body: {
                items,
                external_reference: order.id,
                payer: {
                    email: user.email
                }
            }
        });

        if (!payment) {
            throw new AppError("Erro ao criar pagamento");
        }

        const newPayment = new Payment(
            order.id,
            "mercadopago",
            order.value,
            PaymentStatus.PENDING,
            payment.id
        );

        await this.paymentRepository.create(newPayment);

        logger.info(`Payment created for order ${order.id}`);

        return {
            alreadyExists: false,
            id: payment.id,
            init_point: payment.init_point,
            sandbox_init_point: payment.sandbox_init_point
        };
    }
}