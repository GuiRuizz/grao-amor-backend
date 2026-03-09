import { AppError } from "../../../utils/AppError.js";
import type { ICartRepository } from "../../domain/repositories/ICartRepository.js";
import { Logger } from "../../../utils/Logger.js";

const logger = new Logger("GetCartUseCase");

export class GetCartUseCase {
    constructor(private cartRepo: ICartRepository) { }

    async execute(userId: string) {
        if (!userId) {
            logger.warn("Missing userId for get cart");
            throw new AppError("userId é obrigatório.");
        }
        logger.info(`Retrieving cart for user ${userId}`);
        return this.cartRepo.getCartByUserId(userId);
    }
}