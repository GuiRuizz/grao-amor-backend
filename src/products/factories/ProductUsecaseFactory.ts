
import { Logger } from "../../utils/Logger.js";
import { CreateProductUseCase } from "../application/use-cases/CreateProductUseCase.js";
import { DeleteProductUseCase } from "../application/use-cases/DeleteProductUseCase.js";
import { GetAllProductsUseCase } from "../application/use-cases/GetAllProductsUseCase.js";
import { GetProductByIdUseCase } from "../application/use-cases/GetByIdProductUseCase.js";
import { UpdateProductUseCase } from "../application/use-cases/UpdateProductUseCase.js";
import { PrismaProductRepository } from "../infrastructure/repositories/PrismaProductRepository.js";

// Cria uma instância do repositório
const productRepository = new PrismaProductRepository();
const logger = new Logger("ProductUsecaseFactory");

// Cria instâncias de Use Cases
export const createProductUseCase = new CreateProductUseCase(productRepository);
export const getAllProductsUseCase = new GetAllProductsUseCase(productRepository);
export const getProductByIdUseCase = new GetProductByIdUseCase(productRepository);
export const updateProductUseCase = new UpdateProductUseCase(productRepository);
export const deleteProductUseCase = new DeleteProductUseCase(productRepository);

logger.info("Product Use Cases initialized successfully");