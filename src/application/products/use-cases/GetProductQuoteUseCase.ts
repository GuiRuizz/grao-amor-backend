import type { IProductRepository } from "../../../domain/products/repositories/IProductRepository.js";

export class GetProductQuoteUseCase {
    constructor(private productRepository: IProductRepository) { }

    async execute(productId: string, quantityKg: number, freight: number) {
        const product = await this.productRepository.findById(productId);

        if (!product) {
            throw new Error("Produto não encontrado");
        }

        const total = product.calculatePrice(quantityKg) + freight;

        return {
            product: product.name,
            quantityKg,
            freight,
            total
        };
    }
}