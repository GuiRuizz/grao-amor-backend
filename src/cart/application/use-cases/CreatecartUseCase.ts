import { Logger } from "../../../utils/Logger.js";
import type { ICartRepository } from "../../domain/repositories/ICartRepository.js";
import { Cart } from "../../domain/entities/Cart.js";

const logger = new Logger("CreateCartUseCase");

export class CreateCartUseCase {

    constructor(private repository: ICartRepository) { }

    async execute(userId: string): Promise<Cart> {

        logger.info(`Criando carrinho para o usuário ${userId}`);

        const existingCart = await this.repository.getCartByUserId(userId);

        if (existingCart) {
            logger.warn(`Usuário ${userId} já possui um carrinho`);
            return existingCart;
        }

        const cart = new Cart(userId);

        await this.repository.create(cart);

        logger.info(`Carrinho criado com sucesso para o usuário ${userId}`);

        return cart;
    }
}