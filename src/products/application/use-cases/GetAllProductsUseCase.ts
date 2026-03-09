
import { Logger } from "../../../utils/Logger.js";
import type { IProductRepository } from "../../domain/repositories/IProductRepository.js";
import type { ProductFilterDTO } from "../dto/ProductFilterDTO.js";


const logger = new Logger("GetAllProductsUseCase");
export class GetAllProductsUseCase {


    constructor(private repository: IProductRepository) { }

    async execute(filters?: ProductFilterDTO) {
        logger.info("Retrieving all products");
        const products = await this.repository.findAll(filters);
        logger.info(`Retrieved ${products.length} products`);
        return products;
    }
}
