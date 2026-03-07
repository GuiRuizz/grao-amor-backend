import { Product } from "../../../domain/products/entities/Product.js";
import type { IProductRepository } from "../../../domain/products/repositories/IProductRepository.js";
import { createLogger } from "../../../utils/factories/LoggerFactory.js";

export class DeleteProductUseCase {
    private productRepo: IProductRepository;
    private logger = createLogger();

    constructor(productRepo: IProductRepository) {
        this.productRepo = productRepo;
    }

    async execute(id: string): Promise<Product | null> {
        // Validação simples
        if (!id || typeof id !== "string") {
            this.logger.warn("Invalid ID provided");
            throw new Error("ID inválido.");
        }

        // Busca o produto no repositório
        const product = await this.productRepo.findById(id);

        if (!product) {
            this.logger.warn(`Product with ID ${id} not found`);
            throw new Error("Produto não encontrado.");
        }

        // Deleta o produto
        await this.productRepo.delete(id);

        this.logger.info(`Product with ID ${id} deleted successfully`);

        // Retorna o produto deletado (opcional, útil para logs ou confirmação)
        return product;
    }
}