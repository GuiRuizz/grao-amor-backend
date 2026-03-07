import { Product } from "../../../domain/products/entities/Product.js"
import type { IProductRepository } from "../../../domain/products/repositories/IProductRepository.js"
import { Logger } from "../../../utils/Logger.js";
import type { ProductDTO } from "../dto/ProductDTO.js"

const logger = new Logger("UpdateProductUseCase");
export class UpdateProductUseCase {
    private productRepo: IProductRepository;

    constructor(productRepo: IProductRepository) {
        this.productRepo = productRepo;
    }

    async execute(id: string, data: ProductDTO): Promise<Product> {
        // Validação básica
        if (!id || typeof id !== "string") {
            logger.warn("Invalid ID provided");
            throw new Error("ID inválido.");
        }

        if (!data || Object.keys(data).length === 0) {
            logger.warn("No data provided for update");
            throw new Error("Nenhum dado para atualizar.");
        }

        // Busca o produto no repositório
        const product = await this.productRepo.findById(id);

        if (!product) {
            logger.info(`Product with ID ${id} not found`);
            throw new Error("Produto não encontrado.");
        }

        // Atualiza os campos do produto
        const updatedProduct = { ...product, ...data };

        // Salva no repositório
        await this.productRepo.update(id, updatedProduct);

        logger.info(`Product with ID ${id} updated successfully`);

        return updatedProduct;
    }
}