import { AppError } from "../../../utils/AppError.js";
import type { ICartRepository } from "../../domain/repositories/ICartRepository.js";
import { Logger } from "../../../utils/Logger.js";
import type { CartDTO } from "../dto/CartDTO.js";

const logger = new Logger("RemoveItemUseCase");

export class RemoveItemUseCase {
    constructor(private cartRepo: ICartRepository) { }

    async execute(data: CartDTO) {
        logger.info(`Attempting to remove item from cart: userId=${data.userId}, productId=${data.productId}, quantity=${data.quantity}`);
        if (!data.userId) {
            logger.warn("Missing userId for remove item ");
            throw new AppError("userId é obrigatório.");
        }
        if (!data.productId) {
            logger.warn("Missing productId for remove item");
            throw new AppError("productId é obrigatório.");
        }
        if (data.quantity < 0) {
            logger.warn(`Invalid quantity: ${data.quantity} for product ${data.productId}`);
            throw new AppError("Quantidade deve ser maior que zero.");
        }
        logger.info(`Removing item from cart for user ${data.userId}`);
        return this.cartRepo.removeItem(data);
    }
}