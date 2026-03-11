
import { PrismaOrdersRepository } from "../../orders/infrastructure/repositories/PrismaOrderRespository.js";
import { PrismaProductRepository } from "../../products/infrastructure/repositories/PrismaProductRepository.js";
import { PrismaUserRepository } from "../../users/infrastructure/repositories/PrismaUserRespository.js";
import { Logger } from "../../utils/Logger.js";
import { CreatePaymentUseCase } from "../application/use-cases/CreatePaymentUseCase .js";
import { GetAllPaymentsUseCase } from "../application/use-cases/GetAllPaymentsUseCase.js";
import { GetPaymentByProviderIdUseCase } from "../application/use-cases/GetPaymentByProviderIdUseCase.js";
import { GetPaymentProviderUseCase } from "../application/use-cases/GetPaymentProviderUseCase .js";
import { GetPaymentsByIdUseCase } from "../application/use-cases/GetPaymentsByIdUseCase.js";
import { UpdatePaymentStatusUseCase } from "../application/use-cases/UpdateStatusUseCase.js";
import client from "../infrastructure/mercadoPagoClient.js";
import { PrismaPaymentsRepository } from "../infrastructure/repositories/PrismaPaymentsRespository.js";


// Cria uma instância do repositório
const userRepository = new PrismaUserRepository();
const ordersRepository = new PrismaOrdersRepository();
const productRepository = new PrismaProductRepository();
const paymentsRepository = new PrismaPaymentsRepository();
const clientMercadoPago = client;
const logger = new Logger("PaymentUsecaseFactory");

// Cria instâncias de Use Cases
export const createPaymentUseCase = new CreatePaymentUseCase(ordersRepository, userRepository, productRepository, paymentsRepository, clientMercadoPago);
export const getAllPayemntsUseCase = new GetAllPaymentsUseCase(clientMercadoPago);
export const getPaymentsByIdUseCase = new GetPaymentsByIdUseCase(clientMercadoPago, paymentsRepository);
export const updatePaymentStatusUseCase = new UpdatePaymentStatusUseCase(paymentsRepository)
export const getPaymentByProviderIdUseCase = new GetPaymentByProviderIdUseCase(paymentsRepository)
export const getPaymentProviderUseCase = new GetPaymentProviderUseCase(clientMercadoPago)

logger.info("Payment Use Cases initialized successfully");