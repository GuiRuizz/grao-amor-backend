import { Product } from "../../domain/entities/Product.js";
import type { ProductDTO } from "../dto/ProductDTO.js";
import type { ProductResponseDTO } from "../dto/ProductResponseDTO.js";

export class ProductMapper {

    static toDomain(dto: ProductDTO): Product {
        return new Product(
            dto.name,
            dto.brand,
            dto.pricePerKg,
            dto.stockKg,
            dto.categoryId,
            dto.id
        );
    }

    static toResponse(product: any): ProductResponseDTO {
        return {
            id: product.id,
            name: product.name,
            brand: product.brand,
            pricePerKg: product.pricePerKg,
            stockKg: product.stockKg,
            category: {
                id: product.category.id,
                name: product.category.name,
                description: product.category.description
            }
        }
    }

}