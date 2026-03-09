import { AppError } from "../../../utils/AppError.js";
import type { ICartRepository } from "../../domain/repositories/ICartRepository.js";
import { Logger } from "../../../utils/Logger.js";
import type { CartDTO } from "../dto/CartDTO.js";

const logger = new Logger("UpdateItemUseCase");

export class UpdateItemUseCase {
    constructor(private cartRepo: ICartRepository) { }

    async execute(data: CartDTO) {
        if (!data.userId) {
            logger.warn("Missing userId for update item");
            throw new AppError("userId é obrigatório.");
        }
        if (!data.productId) {
            logger.warn("Missing productId for update item");
            throw new AppError("productId é obrigatório.");
        }
        if (data.quantity <= 0) {
            logger.warn(`Invalid quantity: ${data.quantity} for product ${data.productId}`);
            throw new AppError("Quantidade deve ser maior que zero.");
        }
        logger.info(`Updating item in cart for user ${data.userId}`);
        return this.cartRepo.updateItem(data);
    }
}