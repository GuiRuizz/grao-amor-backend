import type { IOrdersRepository } from "../../domain/repositories/IOrdersRepository.js";
import { Logger } from "../../../utils/Logger.js";
import type { Orders } from "../../domain/entities/Orders.js";
import { AppError } from "../../../utils/AppError.js";
import type { OrderStatus } from "../../../../generated/prisma/enums.js";

const logger = new Logger("UpdateOrdersUseCase");

export class UpdateOrdersUseCase {
    private orderRepo: IOrdersRepository;

    constructor(orderRepo: IOrdersRepository) {
        this.orderRepo = orderRepo;
    }

    async execute(id: string, status: OrderStatus): Promise<Orders> {
        if (!id || typeof id !== "string") {
            logger.warn("Invalid ID provided");
            throw new AppError("ID inválido.");
        }

        // Verifica se status é válido
        const validStatuses = ["PENDING", "PAID", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELED"];
        if (!validStatuses.includes(status)) {
            throw new AppError("Status inválido.");
        }

        // Atualiza no repositório
        await this.orderRepo.updateStatus(id, status);
        logger.info(`Order ${id} status updated to ${status}`);

        // Busca o pedido atualizado
        const updatedOrder = await this.orderRepo.findById(id);
        if (!updatedOrder) {
            throw new AppError("Pedido não encontrado após atualização.");
        }

        return updatedOrder;
    }
}