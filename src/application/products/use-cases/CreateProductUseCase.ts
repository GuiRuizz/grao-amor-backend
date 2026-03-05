import { Product } from "../../../domain/products/entities/Product.js"
import type { IProductRepository } from "../../../domain/products/repositories/IProductRepository.js"
import type { ProductDTO } from "../dto/ProductDTO.js"

export class CreateProductUseCase {

  constructor(private repository: IProductRepository) { }

  async execute(data: ProductDTO) {

    if (data.pricePerKg <= 0) {
      throw new Error("Preço inválido")
    }

    if (data.stockKg < 0) {
      throw new Error("Estoque inválido")
    }

    const product = new Product(
      data.name,
      data.brand,
      data.pricePerKg,
      data.stockKg
    )

    await this.repository.create(product)

    return product
  }
}