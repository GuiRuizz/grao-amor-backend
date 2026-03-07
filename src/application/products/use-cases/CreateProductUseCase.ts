import { Product } from "../../../domain/products/entities/Product.js"
import type { IProductRepository } from "../../../domain/products/repositories/IProductRepository.js"
import { createLogger } from "../../../utils/factories/LoggerFactory.js";
import type { ProductDTO } from "../dto/ProductDTO.js"

export class CreateProductUseCase {
  private logger = createLogger();

  constructor(private repository: IProductRepository) { }

  async execute(data: ProductDTO) {

    if (data.pricePerKg <= 0) {
      this.logger.warn(`Invalid price per kg: ${data.pricePerKg}`);
      throw new Error("Preço inválido")
    }

    if (data.stockKg < 0) {
      this.logger.warn(`Invalid stock kg: ${data.stockKg}`);
      throw new Error("Estoque inválido")
    }

    const product = new Product(
      data.name,
      data.brand,
      data.pricePerKg,
      data.stockKg
    )

    await this.repository.create(product)

    this.logger.info(`Product created: ${product.name} (${product.id})`)

    return product
  }
}