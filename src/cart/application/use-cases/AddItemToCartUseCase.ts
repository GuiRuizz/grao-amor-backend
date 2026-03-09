import { AppError } from "../../../utils/AppError.js";
import type { ICartRepository } from "../../domain/repositories/ICartRepository.js";
import type { CartDTO } from "../dto/CartDTO.js";
import { Logger } from "../../../utils/Logger.js";

const logger = new Logger("AddItemToCartUseCase");
export class AddItemToCartUseCase {
    constructor(private cartRepo: ICartRepository) { }

    async execute(data: CartDTO) {
        if (data.quantity <= 0) {
            logger.warn(`Invalid quantity: ${data.quantity} for product ${data.productId}`);
            throw new AppError("Quantidade deve ser maior que zero.");
        }

        if (!data.userId || !data.productId) {
            logger.warn(`Missing userId or productId: userId=${data.userId}, productId=${data.productId}`);
            throw new AppError("userId e productId são obrigatórios.");
        }

        await this.cartRepo.addItem(data);
        logger.info(`Item added to cart for user ${data.userId}`);
        return
    }
}