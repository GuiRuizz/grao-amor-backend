
import { Logger } from "../../../utils/Logger.js";
import type { IProductRepository } from "../../domain/repositories/IProductRepository.js";


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
