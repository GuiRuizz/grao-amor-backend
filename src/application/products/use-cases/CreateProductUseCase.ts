import { Product } from "../../../domain/products/entities/Product.js"
import type { IProductRepository } from "../../../domain/products/repositories/IProductRepository.js"
import { Logger } from "../../../utils/Logger.js";
import type { ProductDTO } from "../dto/ProductDTO.js"

const logger = new Logger("CreateProductUseCase");
export class CreateProductUseCase {

  constructor(private repository: IProductRepository) { }

  async execute(data: ProductDTO) {

    if (data.pricePerKg <= 0) {
      logger.warn(`Invalid price per kg: ${data.pricePerKg}`);
      throw new Error("Preço inválido")
    }

    if (data.stockKg < 0) {
      logger.warn(`Invalid stock kg: ${data.stockKg}`);
      throw new Error("Estoque inválido")
    }

    const product = new Product(
      data.name,
      data.brand,
      data.pricePerKg,
      data.stockKg
    )

    await this.repository.create(product)

    logger.info(`Product created: ${product.name} (${product.id})`)

    return product
  }
}