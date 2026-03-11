
import { PrismaOrdersRepository } from "../../orders/infrastructure/repositories/PrismaOrderRespository.js";
import { PrismaProductRepository } from "../../products/infrastructure/repositories/PrismaProductRepository.js";
import { PrismaUserRepository } from "../../users/infrastructure/repositories/PrismaUserRespository.js";
import { Logger } from "../../utils/Logger.js";
import { CreatePaymentUseCase } from "../application/use-cases/CreatePaymentUseCase .js";
import client from "../infrastructure/mercadoPagoClient.js";


// Cria uma instância do repositório
const userRepository = new PrismaUserRepository();
const ordersRepository = new PrismaOrdersRepository();
const productRepository = new PrismaProductRepository();
const clientMercadoPago = client;
const logger = new Logger("PaymentUsecaseFactory");

// Cria instâncias de Use Cases
export const createPaymentUseCase = new CreatePaymentUseCase(ordersRepository, userRepository, productRepository, clientMercadoPago);

logger.info("Payment Use Cases initialized successfully");