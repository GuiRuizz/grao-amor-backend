
import { AppError } from "../../../utils/AppError.js";
import { Logger } from "../../../utils/Logger.js";
import type { Category } from "../../domain/entities/Category.js";
import type { ICategoryRepository } from "../../domain/repositories/ICategoryRepository.js";

const logger = new Logger("GetCategoryByIdUseCase");
export class GetCategoryByIdUseCase {
    private categoryRepo: ICategoryRepository;

    constructor(categoryRepo: ICategoryRepository) {
        this.categoryRepo = categoryRepo;
    }

    async execute(id: string): Promise<Category | null> {
        // Validação simples
        if (!id || typeof id !== "string") {
            logger.warn("Invalid ID provided");
            throw new AppError("ID inválido.");
        }

        // Busca a categoria no repositório
        const category = await this.categoryRepo.findById(id);

        if (!category) {
            logger.info(`Category with ID ${id} not found`);
            throw new AppError("Categoria não encontrada.");
        }

        logger.info(`Category with ID ${id} found`);
        return category;
    }
}