
import type { PaymentStatus } from "../../../../generated/prisma/enums.js";
import { AppError } from "../../../utils/AppError.js";
import { Logger } from "../../../utils/Logger.js";
import type { IPaymentsRepository } from "../../domain/repositories/IPaymentRepository.js";

const logger = new Logger("UpdatePaymentStatusUseCase");

export class UpdatePaymentStatusUseCase {
    constructor(private paymentRepository: IPaymentsRepository) {}

    /**
     * Atualiza o status de um pagamento
     * @param providerRef ID do pagamento no provedor (ex: Mercado Pago)
     * @param status novo status do pagamento (ex: "PENDING", "APPROVED")
     */
    async execute(providerRef: string, status: PaymentStatus) {
        if (!providerRef) {
            throw new AppError("ProviderRef inválido", 400);
        }

        if (!status) {
            throw new AppError("Status inválido", 400);
        }

        // Atualiza o status no banco
        await this.paymentRepository.updateStatus(providerRef, status);

        logger.info(`Pagamento ${providerRef} atualizado para status: ${status}`);
        return { providerRef, status };
    }
}