
import { Logger } from "../../../utils/Logger.js";
import type { Category } from "../../domain/entities/Category.js";
import type { ICategoryRepository } from "../../domain/repositories/ICategoryRepository.js";
import type { CategoryDTO } from "../dto/CategoryDTO.js"

const logger = new Logger("UpdateCategoryUseCase");
export class UpdateCategoryUseCase {
    private categoryRepo: ICategoryRepository;

    constructor(categoryRepo: ICategoryRepository) {
        this.categoryRepo = categoryRepo;
    }

    async execute(id: string, data: CategoryDTO): Promise<Category> {
        // Validação básica
        if (!id || typeof id !== "string") {
            logger.warn("Invalid ID provided");
            throw new Error("ID inválido.");
        }

        if (!data || Object.keys(data).length === 0) {
            logger.warn("No data provided for update");
            throw new Error("Nenhum dado para atualizar.");
        }

        // Busca a categoria no repositório
        const category = await this.categoryRepo.findById(id);

        if (!category) {
            logger.info(`Category with ID ${id} not found`);
            throw new Error("Categoria não encontrada.");
        }

        // Atualiza os campos do produto
        const updatedCategory = { ...category, ...data };

        // Salva no repositório
        await this.categoryRepo.update(id, updatedCategory);

        logger.info(`Category with ID ${id} updated successfully`);

        return updatedCategory;
    }
}