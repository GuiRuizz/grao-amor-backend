import type { IOrdersRepository } from "../../domain/repositories/IOrdersRepository.js";
import { Logger } from "../../../utils/Logger.js";
import type { Orders } from "../../domain/entities/Orders.js";
import { AppError } from "../../../utils/AppError.js";

const logger = new Logger("GetMyOrdersUseCase");

export class GetMyOrdersUseCase {
  constructor(private orderRepo: IOrdersRepository) {}

  async execute(userId: string): Promise<Orders[]> {
    
    if (!userId) {
      logger.warn("UserId not provided");
      throw new AppError("UserId inválido");
    }

    const orders = await this.orderRepo.findByUserId(userId);

    if (!orders || orders.length === 0) {
      logger.info(`No orders found for user ${userId}`);
      return [];
    }

    return orders;
  }
}