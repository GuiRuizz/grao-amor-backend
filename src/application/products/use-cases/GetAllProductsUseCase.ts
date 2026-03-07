import type { IProductRepository } from "../../../domain/products/repositories/IProductRepository.js"
import { createLogger } from "../../../utils/factories/LoggerFactory.js";


export class GetAllProductsUseCase {

    private logger = createLogger();

    constructor(private repository: IProductRepository) { }

    async execute() {
        this.logger.info("Retrieving all products");
        const products = await this.repository.findAll();
        this.logger.info(`Retrieved ${products.length} products`);
        return products;
    }
}
