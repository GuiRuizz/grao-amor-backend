import { MercadoPagoConfig, Preference } from "mercadopago";
import type { IOrdersRepository } from "../../../orders/domain/repositories/IOrdersRepository.js";
import type { IUserRepository } from "../../../users/domain/repositories/IUserRepository.js";
import { AppError } from "../../../utils/AppError.js";
import { Logger } from "../../../utils/Logger.js";
import type { IProductRepository } from "../../../products/domain/repositories/IProductRepository.js";


const logger = new Logger("PaymentUseCase");
export class CreatePaymentUseCase {
    constructor(
        private orderRepository: IOrdersRepository,
        private userRepository: IUserRepository,
        private productRepository: IProductRepository,
        private client: MercadoPagoConfig,
    ) { }

    async execute(orderId: string, userId: string) {

        const order = await this.orderRepository.findById(orderId);
        const user = await this.userRepository.findById(userId);


        if (!order) {
            throw new AppError("Pedido não encontrado");
        }

        const preference = new Preference(this.client);

        const products = await Promise.all(
            order.items.map(item => this.productRepository.findById(item.productId))
        );

        const items = order.items.map((item, index) => ({
            id: item.productId,
            title: products[index]?.name ?? "Produto",
            quantity: item.quantity,
            unit_price: item.price
        }));


        const payment = await preference.create({
            body: {
                items,
                external_reference: order.id,
                payer: {
                    email: user?.email
                },
                back_urls: {
                    success: "https://imgs.search.brave.com/UIZZUAnucZCUIPZz85JJfum69sYc4A7LgH8pxsGjO3w/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJzLmNvbS9p/bWFnZXMvaGQvbW90/aXZhdGlvbmFsLXN1/Y2Nlc3MtcXVvdGUt/MWYwaTE1bzM5am8y/Nnoyby5qcGc",
                    pending: "https://imgs.search.brave.com/odz3ftuUPON2a5CzeBK3fPpDB1aESjnLjML0MO9WZrA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9kaWdp/dGFsc3lub3BzaXMu/Y29tL3dwLWNvbnRl/bnQvdXBsb2Fkcy8y/MDE2LzA2L2xvYWRp/bmctYW5pbWF0aW9u/cy1wcmVsb2FkZXIt/Z2lmcy11aS11eC1l/ZmZlY3RzLTE4Lmdp/Zg.gif",
                    failure: "https://imgs.search.brave.com/v9-UkFy10pblKTXc2jacmMxxywFaVcD-7nP_mP7XBsQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS50ZW5vci5jb20v/dDhqSUVmZ1RlSVlB/QUFBTS9taW5laHV0/LW1oLmdpZg.gif"
                }

            }
        });

        if (!payment) {
            throw new AppError("Erro ao criar pagamento");
        }

        return payment;
    }
}