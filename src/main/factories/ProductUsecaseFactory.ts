    
import { CreateProductUseCase } from "../../application/products/use-cases/CreateProductUseCase.js";
import { GetAllProductsUseCase } from "../../application/products/use-cases/GetAllProductsUseCase.js";
import { GetProductByIdUseCase } from "../../application/products/use-cases/GetByIdProductUseCase.js";
import { UpdateProductUseCase } from "../../application/products/use-cases/UpdateProductUseCase.js";
import { DeleteProductUseCase } from "../../application/products/use-cases/DeleteProductUseCase.js";
import { PrismaProductRepository } from "../../infrastructure/products/repositories/PrismaProductRepository.js";

// Cria uma instância do repositório
const productRepository = new PrismaProductRepository();

// Cria instâncias de Use Cases
export const createProductUseCase = new CreateProductUseCase(productRepository);
export const getAllProductsUseCase = new GetAllProductsUseCase(productRepository);
export const getProductByIdUseCase = new GetProductByIdUseCase(productRepository);
export const updateProductUseCase = new UpdateProductUseCase(productRepository);
export const deleteProductUseCase = new DeleteProductUseCase(productRepository);