


import { PrismaCartRepository } from "../../cart/infrastructure/repositories/PrismaCartRespository.js";
import { PrismaProductRepository } from "../../products/infrastructure/repositories/PrismaProductRepository.js";

import { Logger } from "../../utils/Logger.js";
import { CreateOrderUseCase } from "../application/use-cases/CreateOrderUseCase.js";
import { DeleteOrderUseCase } from "../application/use-cases/DeleteOrderUseCase.js";
import { GetAllOrdersUseCase } from "../application/use-cases/GetAllOrdersUseCase.js";
import { GetOrdersByIdUseCase } from "../application/use-cases/GetByIdOrderUseCase.js";
import { GetMyOrdersUseCase } from "../application/use-cases/GetMyOrdersUseCase.js";
import { UpdateOrdersUseCase } from "../application/use-cases/UpdateOrderUseCase.js";
import { PrismaOrdersRepository } from "../infrastructure/repositories/PrismaOrderRespository.js";



// Cria uma instância do repositório
const orderRepository = new PrismaOrdersRepository();
const productRepository = new PrismaProductRepository();
const cartRepository = new PrismaCartRepository();
const logger = new Logger("OrderUsecaseFactory");

// Cria instâncias de Use Cases
export const createOrderUseCase = new CreateOrderUseCase(orderRepository, cartRepository, productRepository);
export const getAllOrdersUseCase = new GetAllOrdersUseCase(orderRepository);
export const getOrderByIdUseCase = new GetOrdersByIdUseCase(orderRepository);
export const deleteOrderUseCase = new DeleteOrderUseCase(orderRepository);
export const updateOrderUseCase = new UpdateOrdersUseCase(orderRepository);
export const getMyOrdersUseCase = new GetMyOrdersUseCase(orderRepository);


logger.info("Order Use Cases initialized successfully");
