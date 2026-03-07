import type { IProductRepository } from "../../../domain/products/repositories/IProductRepository.js"
import { Logger } from "../../../utils/Logger.js";


const logger = new Logger("GetAllProductsUseCase");
export class GetAllProductsUseCase {


    constructor(private repository: IProductRepository) { }

    async execute() {
        logger.info("Retrieving all products");
        const products = await this.repository.findAll();
        logger.info(`Retrieved ${products.length} products`);
        return products;
    }
}
