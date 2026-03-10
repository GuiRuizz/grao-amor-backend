
import type { IOrdersRepository } from "../../domain/repositories/IOrdersRepository.js";
import { Logger } from "../../../utils/Logger.js";
import type { Orders } from "../../domain/entities/Orders.js";
import { AppError } from "../../../utils/AppError.js";



const logger = new Logger("GetOrdersByIdUseCase");

export class GetOrdersByIdUseCase {
    private orderRepo: IOrdersRepository;

    constructor(orderRepo: IOrdersRepository) {
        this.orderRepo = orderRepo;
    }

    async execute(id: string): Promise<Orders | null> {
        // Validação simples
        if (!id || typeof id !== "string") {
            logger.warn("Invalid ID provided");
            throw new AppError("ID inválido.");
        }

        // Busca o usuário no repositório
        const user = await this.orderRepo.findById(id);

        if (!user) {
            logger.info(`Order with ID ${id} not found`);
            throw new AppError("Pedido não encontrado.");
        }

        return user;
    }
}