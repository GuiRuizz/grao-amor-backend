import { MercadoPagoConfig, Payment } from "mercadopago";
import { Logger } from "../../../utils/Logger.js";
import type { IPaymentsRepository } from "../../domain/repositories/IPaymentRepository.js";
import { AppError } from "../../../utils/AppError.js";

const logger = new Logger("GetPaymentsByIdUseCase");

export class GetPaymentsByIdUseCase {
    constructor(
        private client: MercadoPagoConfig,
        private paymentRepository: IPaymentsRepository
    ) { }

    async execute(paymentId: string) {

        const payment = await this.paymentRepository.findById(paymentId);

        if (!payment) {
            throw new AppError("Pagamento não encontrado");
        }

        return payment;
    }
}