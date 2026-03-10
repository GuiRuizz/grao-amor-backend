import type { IOrdersRepository } from "../../domain/repositories/IOrdersRepository.js";
import type { ICartRepository } from "../../../cart/domain/repositories/ICartRepository.js";
import type { IProductRepository } from "../../../products/domain/repositories/IProductRepository.js";

import type { CreateOrderDTO } from "../dto/OrdersDTO.js";

import { AppError } from "../../../utils/AppError.js";
import { Logger } from "../../../utils/Logger.js";

import { Orders } from "../../domain/entities/Orders.js";
import { OrderItem } from "../../domain/entities/OrderItem.js";

const logger = new Logger("CreateOrderUseCase");

export class CreateOrderUseCase {

  constructor(
    private orderRepository: IOrdersRepository,
    private cartRepository: ICartRepository,
    private productRepository: IProductRepository
  ) { }

  async execute(data: CreateOrderDTO): Promise<Orders> {

    const { userId, paymentMethod } = data;

    const cart = await this.cartRepository.getCartByUserId(userId);

    if (!cart || cart.items.length === 0) {
      throw new AppError("O carrinho está vazio", 400);
    }

    const orderItems: OrderItem[] = [];

    for (const item of cart.items) {

      const product = await this.productRepository.findById(item.productId);

      if (!product) {
        throw new AppError(`Product ${item.productId} not found`, 404);
      }

      orderItems.push(
        new OrderItem(
          product.id,
          item.quantity,
          product.pricePerKg
        )
      );
    }

    const total = orderItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const order = new Orders(
      userId,
      paymentMethod,
      total,
      orderItems  
    );

    await this.orderRepository.create(order);

    await this.cartRepository.clearCart(userId);

    logger.info(`Order ${order.id} created successfully`);

    return order;
  }
}