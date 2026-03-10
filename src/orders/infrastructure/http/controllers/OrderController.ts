import type { Request, Response } from "express"
import { Logger } from "../../../../utils/Logger.js"

import type { CreateOrderUseCase } from "../../../application/use-cases/CreateOrderUseCase.js";
import type { DeleteOrderUseCase } from "../../../application/use-cases/DeleteOrderUseCase.js";
import type { GetAllOrdersUseCase } from "../../../application/use-cases/GetAllOrdersUseCase.js";
import type { GetOrdersByIdUseCase } from "../../../application/use-cases/GetByIdOrderUseCase.js";
import type { UpdateOrdersUseCase } from "../../../application/use-cases/UpdateOrderUseCase.js";
import { toOrdersAdminResponse, toOrdersResponse } from "../../../application/dto/MappersOrders.js";
import type { GetMyOrdersUseCase } from "../../../application/use-cases/GetMyOrdersUseCase.js";
import type { OrderStatus } from "../../../../../generated/prisma/client.js";
const logger = new Logger("OrderController");
export class OrderController {

    constructor(
        private createOrderUseCase: CreateOrderUseCase,
        private deleteOrderUseCase: DeleteOrderUseCase,
        private getOrderByIdUseCase: GetOrdersByIdUseCase,
        private getAllOrdersUseCase: GetAllOrdersUseCase,
        private updateOrderUseCase: UpdateOrdersUseCase,
        private getMyOrdersUseCase: GetMyOrdersUseCase,

    ) {
    }

    async create(req: Request, res: Response) {

        const { paymentMethod } = req.body;  // só pega o método de pagamento

        const userId = req.userId; // vem do JWT

        const order = await this.createOrderUseCase.execute({
            userId: userId!,
            paymentMethod
        });

        logger.info(`Order created successfully with ID ${order.id}`);

        return res.status(201).json(toOrdersResponse(order));
    }

    async getAll(req: Request, res: Response) {
        const page = Number(req.query.page) || 1;
        const pageSize = Number(req.query.pageSize) || 10;
        const orders = await this.getAllOrdersUseCase.execute(page, pageSize)
        logger.info(`Retrieved ${orders.length} orders successfully`);
        res.status(200).json(orders.map(toOrdersAdminResponse))

    }

    async getById(req: Request, res: Response) {

        const id = req.params.id;

        if (!id || Array.isArray(id)) {
            logger.warn("Invalid ID provided");
            return res.status(400).json({ message: "ID inválido" });
        }

        const order = await this.getOrderByIdUseCase.execute(id);

        if (!order) {
            logger.info(`Order with ID ${id} not found`);
            return res.status(404).json({ message: "Pedido não encontrado." });
        }

        logger.info(`Order with ID ${id} retrieved successfully`);
        return res.json(toOrdersResponse(order));

    }

    async updateStatus(req: Request, res: Response) {
        const id = req.params.id;
        const { status } = req.body; // pega do Postman

        if (!id || Array.isArray(id)) {
            return res.status(400).json({ message: "ID inválido" });
        }

        // Verifica se o status enviado é válido
        if (!["PENDING", "PAID", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELED"].includes(status)) {
            return res.status(400).json({ message: "Status inválido" });
        }

        // Converte a string para o enum TypeScript
        const statusEnum = status as OrderStatus;

        const updatedOrder = await this.updateOrderUseCase.execute(id, statusEnum);

        return res.json({ message: "Pedido atualizado com sucesso", order: toOrdersResponse(updatedOrder!) });
    }

    async delete(req: Request, res: Response) {

        const id = req.params.id;

        if (!id || Array.isArray(id)) {
            logger.warn("Invalid ID provided");
            return res.status(400).json({ message: "ID inválido" });
        }

        await this.deleteOrderUseCase.execute(id);
        logger.info(`User with ID ${id} deleted successfully`);

        res.status(204).send();

    }

    async getMyOrders(req: Request, res: Response) {
        const userId = req.userId;

        if (!userId) {
            logger.warn("User ID not found in request");
            return res.status(401).json({ message: "Usuário não autenticado." });
        }

        const orders = await this.getMyOrdersUseCase.execute(userId);

        logger.info(`Retrieved ${orders.length} orders for user ID ${userId} successfully`);

        return res.json(orders);
    }

}