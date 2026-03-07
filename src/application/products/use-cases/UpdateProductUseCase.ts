import { Product } from "../../../domain/products/entities/Product.js"
import type { IProductRepository } from "../../../domain/products/repositories/IProductRepository.js"
import { createLogger } from "../../../utils/factories/LoggerFactory.js";
import type { ProductDTO } from "../dto/ProductDTO.js"

export class UpdateProductUseCase {
    private productRepo: IProductRepository;
    private logger = createLogger();

    constructor(productRepo: IProductRepository) {
        this.productRepo = productRepo;
    }

    async execute(id: string, data: ProductDTO): Promise<Product> {
        // Validação básica
        if (!id || typeof id !== "string") {
                this.logger.warn("Invalid ID provided");
            throw new Error("ID inválido.");
        }

        if (!data || Object.keys(data).length === 0) {
            this.logger.warn("No data provided for update");
            throw new Error("Nenhum dado para atualizar.");
        }

        // Busca o produto no repositório
        const product = await this.productRepo.findById(id);

        if (!product) {
            this.logger.info(`Product with ID ${id} not found`);
            throw new Error("Produto não encontrado.");
        }

        // Atualiza os campos do produto
        const updatedProduct = { ...product, ...data };

        // Salva no repositório
        await this.productRepo.update(id, updatedProduct);

        this.logger.info(`Product with ID ${id} updated successfully`);

        return updatedProduct;
    }
}