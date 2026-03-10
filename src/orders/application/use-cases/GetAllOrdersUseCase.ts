import type { IOrdersRepository } from "../../domain/repositories/IOrdersRepository.js";
import { Logger } from "../../../utils/Logger.js";
import type { Orders } from "../../domain/entities/Orders.js";

const logger = new Logger("GetAllOrdersUseCase");

export class GetAllOrdersUseCase {

    constructor(private repository: IOrdersRepository) { }

    async execute(page: number = 1, pageSize: number = 10): Promise<Orders[]> {
        logger.info("Retrieving all orders");
        const orders = await this.repository.findAll(page, pageSize);
        logger.info(`Retrieved ${orders.length} orders`);
        return orders
    }
}
