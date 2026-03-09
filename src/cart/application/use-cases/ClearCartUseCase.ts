import { AppError } from "../../../utils/AppError.js";
import type { ICartRepository } from "../../domain/repositories/ICartRepository.js";
import { Logger } from "../../../utils/Logger.js";

const logger = new Logger("ClearCartUseCase");

export class ClearCartUseCase {
    constructor(private cartRepo: ICartRepository) { }

    async execute(userId: string) {
        if (!userId) {
            logger.warn("Missing userId for clear cart");
            throw new AppError("userId é obrigatório.");
        }
        logger.info(`Clearing cart for user ${userId}`);
        return this.cartRepo.clearCart(userId);
    }
}