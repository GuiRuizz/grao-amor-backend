import { Product } from "../../../domain/products/entities/Product.js"
import type { IProductRepository } from "../../../domain/products/repositories/IProductRepository.js"


export class GetProductByIdUseCase {
    private productRepo: IProductRepository;

    constructor(productRepo: IProductRepository) {
        this.productRepo = productRepo;
    }

    async execute(id: string): Promise<Product | null> {
        // Validação simples
        if (!id || typeof id !== "string") {
            throw new Error("ID inválido.");
        }

        // Busca o produto no repositório
        const product = await this.productRepo.findById(id);

        if (!product) {
            throw new Error("Produto não encontrado.");
        }

        return product;
    }
}