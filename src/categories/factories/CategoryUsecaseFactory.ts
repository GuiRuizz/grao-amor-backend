
import { Logger } from "../../utils/Logger.js";
import { CreateCategoryUseCase } from "../application/use-cases/CreateCategoryUseCase.js";
import { DeleteCategoryUseCase } from "../application/use-cases/DeleteCategoryUseCase.js";
import { GetAllCategoriesUseCase } from "../application/use-cases/GetAllCategoryUseCase.js";
import { GetCategoryByIdUseCase } from "../application/use-cases/GetByIdCategoryUseCase.js";
import { UpdateCategoryUseCase } from "../application/use-cases/UpdateCategoryUseCase.js";
import { PrismaCategoryRepository } from "../infrastructure/repositories/PrismaProductRepository.js";

// Cria uma instância do repositório
const categoryRepository = new PrismaCategoryRepository();
const logger = new Logger("CategoryUsecaseFactory");

// Cria instâncias de Use Cases
export const createCategoryUseCase = new CreateCategoryUseCase(categoryRepository);
export const getAllCategoriesUseCase = new GetAllCategoriesUseCase(categoryRepository);
export const getCategoryByIdUseCase = new GetCategoryByIdUseCase(categoryRepository);
export const updateCategoryUseCase = new UpdateCategoryUseCase(categoryRepository);
export const deleteCategoryUseCase = new DeleteCategoryUseCase(categoryRepository);

logger.info("Category Use Cases initialized successfully");