import { AppError } from "../../../utils/AppError.js";
import { Logger } from "../../../utils/Logger.js";
import { Category } from "../../domain/entities/Category.js";
import type { ICategoryRepository } from "../../domain/repositories/ICategoryRepository.js";
import type { CategoryDTO } from "../dto/CategoryDTO.js"

const logger = new Logger("CreateCategoryUseCase");
export class CreateCategoryUseCase {

  constructor(private repository: ICategoryRepository) { }

  async execute(data: CategoryDTO) {

    if (data.name.length === 0) {
      logger.warn(`Invalid name: ${data.name}`);
      throw new AppError("Nome inválido")
    }

    const product = new Category(
      data.name,
      data.description
    )

    await this.repository.create(product)

    logger.info(`Categoria criada: ${product.name} (${product.id})`)

    return product
  }
}