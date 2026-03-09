import { AppError } from "../../../utils/AppError.js";
import { Logger } from "../../../utils/Logger.js";
import { Product } from "../../domain/entities/Product.js";
import type { IProductRepository } from "../../domain/repositories/IProductRepository.js";
import type { ProductDTO } from "../dto/ProductDTO.js"
import { ProductMapper } from "../mappers/ProductMappers.js";

const logger = new Logger("CreateProductUseCase");
export class CreateProductUseCase {

  constructor(private repository: IProductRepository) { }

  async execute(data: ProductDTO) {

    if (data.pricePerKg <= 0) {
      logger.warn(`Invalid price per kg: ${data.pricePerKg}`);
      throw new AppError("Preço inválido")
    }

    if (data.stockKg < 0) {
      logger.warn(`Invalid stock kg: ${data.stockKg}`);
      throw new AppError("Estoque inválido")
    }

    if (!data.name || !data.brand || !data.categoryId) {
      logger.warn("Missing required fields: name, brand, or categoryId");
      throw new AppError("Campos obrigatórios faltando: nome, marca ou categoriaId")
    }

    const product = ProductMapper.toDomain(data);

    await this.repository.create(product);

    logger.info(`Product created: ${product.name} (${product.id})`)

    return product
  }
}