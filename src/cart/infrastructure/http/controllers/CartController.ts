import type { Request, Response } from "express";

import { Logger } from "../../../../utils/Logger.js";


import type { GetCartUseCase } from "../../../application/use-cases/GetCartUseCase.js";

import type { ClearCartUseCase } from "../../../application/use-cases/ClearCartUseCase.js";
import type { CreateCartUseCase } from "../../../application/use-cases/CreatecartUseCase.js";
import type { AddItemToCartUseCase } from "../../../application/use-cases/AddItemToCartUseCase.js";
import type { UpdateItemUseCase } from "../../../application/use-cases/UpdateItemUseCase.js";
import type { RemoveItemUseCase } from "../../../application/use-cases/RemoveItemUseCase.js";

const logger = new Logger("CartController");

export class CartController {

    constructor(
        private createCartUseCase: CreateCartUseCase,
        private getCartUseCase: GetCartUseCase,
        private addItemCartUseCase: AddItemToCartUseCase,
        private updateItemCartUseCase: UpdateItemUseCase,
        private removeItemCartUseCase: RemoveItemUseCase,
        private clearCartUseCase: ClearCartUseCase
    ) { }

    async create(req: Request, res: Response) {

        const userId = req.userId; // 👈 vem do JWT

        if (!userId) {
            logger.warn("UserId not provided");
            return res.status(400).json({ message: "userId é obrigatório" });
        }

        const cart = await this.createCartUseCase.execute(userId);

        logger.info(`Cart created for user ${userId}`);

        return res.status(201).json(cart);
    }

    async getCart(req: Request, res: Response) {

        const userId = req.userId; // 👈 vem do JWT

        if (!userId || Array.isArray(userId)) {
            logger.warn("Invalid userId provided");
            return res.status(400).json({ message: "userId inválido" });
        }

        const cart = await this.getCartUseCase.execute(userId);

        if (!cart) {
            logger.info(`Cart for user ${userId} not found`);
            return res.status(404).json({ message: "Carrinho não encontrado" });
        }

        logger.info(`Cart for user ${userId} retrieved successfully`);

        return res.json(cart);
    }

    async addItem(req: Request, res: Response) {


        const userId = req.userId; // 👈 vem do JWT
        const { productId, quantity } = req.body;

        if (!userId || !productId || !quantity) {
            logger.warn("Invalid add item payload");
            return res.status(400).json({ message: "Dados inválidos" });
        }

        const cart = await this.addItemCartUseCase.execute({
            userId,
            productId,
            quantity
        });

        logger.info(`Product ${productId} added to cart of user ${userId}`);

        return res.json(cart);
    }

    async updateItem(req: Request, res: Response) {
        const userId = req.userId; // 👈 vem do JWT
        const { productId, quantity } = req.body;

        if (!userId || !productId || !quantity) {
            logger.warn("Invalid update item payload");
            return res.status(400).json({ message: "Dados inválidos" });
        }

        const cart = await this.updateItemCartUseCase.execute({
            userId,
            productId,
            quantity
        });

        logger.info(`Product ${productId} updated in cart of user ${userId}`);

        return res.json(cart);
    }

    async removeItem(req: Request, res: Response) {

        const userId = req.userId;
        const productId = req.params.productId as string;

        if (!userId) {
            logger.warn("User not authenticated");
            return res.status(401).json({ message: "Usuário não autenticado" });
        }

        if (!productId) {
            logger.warn("ProductId not provided");
            return res.status(400).json({ message: "productId inválido" });
        }

        const cart = await this.removeItemCartUseCase.execute({
            userId,
            productId,
            quantity: 0
        });

        logger.info(`Product ${productId} removed from cart of user ${userId}`);

        return res.json(cart);
    }

    async clear(req: Request, res: Response) {

        const userId = req.userId; // 👈 vem do JWT

        if (!userId || Array.isArray(userId)) {
            logger.warn("Invalid userId provided");
            return res.status(400).json({ message: "userId inválido" });
        }

        await this.clearCartUseCase.execute(userId);

        logger.info(`Cart cleared for user ${userId}`);

        return res.status(204).send();
    }
}