
import { AppError } from "../../../utils/AppError.js";
import { Logger } from "../../../utils/Logger.js";
import type { ICategoryRepository } from "../../domain/repositories/ICategoryRepository.js";


const logger = new Logger("GetAllCategoriesUseCase");
export class GetAllCategoriesUseCase {


    constructor(private repository: ICategoryRepository) { }

    async execute() {
        logger.info("Retrieving all categories");
        const categories = await this.repository.findAll();

        if (!categories || categories.length === 0) {
            logger.info("No categories found");
            throw new AppError("Nenhuma categoria encontrada.");
        }

        logger.info(`Retrieved ${categories.length} categories`);
        return categories;
    }
}
