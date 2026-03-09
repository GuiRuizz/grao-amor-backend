
import { AppError } from "../../../utils/AppError.js";
import { Logger } from "../../../utils/Logger.js";
import type { Category } from "../../domain/entities/Category.js";
import type { ICategoryRepository } from "../../domain/repositories/ICategoryRepository.js";


const logger = new Logger("DeleteCategoryUseCase");
export class DeleteCategoryUseCase {
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

        // Busca o produto no repositório
        const category = await this.categoryRepo.findById(id);

        if (!category) {
            logger.warn(`Category with ID ${id} not found`);
            throw new AppError("Categoria não encontrada.");
        }

        // Deleta o produto
        await this.categoryRepo.delete(id);

        logger.info(`Category with ID ${id} deleted successfully`);

        // Retorna o produto deletado (opcional, útil para logs ou confirmação)
        return category;
    }
}