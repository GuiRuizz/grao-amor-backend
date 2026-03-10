import type { IOrdersRepository } from "../../domain/repositories/IOrdersRepository.js";
import { Logger } from "../../../utils/Logger.js";
import { Orders } from "../../domain/entities/Orders.js";



const logger = new Logger("DeleteOrderUseCase");

export class DeleteOrderUseCase {
    private orderRepo: IOrdersRepository;

    constructor(orderRepo: IOrdersRepository) {
        this.orderRepo = orderRepo;
    }

    async execute(id: string): Promise<Orders | null> {
        // Validação simples
        if (!id || typeof id !== "string") {
            logger.warn("Invalid ID provided");
            throw new Error("ID inválido.");
        }

        // Busca o pedido no repositório
        const order = await this.orderRepo.findById(id);

        if (!order) {
            logger.warn(`Order with ID ${id} not found`);
            throw new Error("Pedido não encontrado.");
        }

        // Deleta o pedido
        await this.orderRepo.delete(id);
        logger.info(`Order with ID ${id} deleted successfully`);

        // Retorna o usuário deletado (opcional, útil para logs ou confirmação)
        return order;
    }
}

