import type { Request, Response } from "express"

import { Logger } from "../../../../utils/Logger.js"
import type { CreateProductUseCase } from "../../../application/use-cases/CreateProductUseCase.js";
import type { DeleteProductUseCase } from "../../../application/use-cases/DeleteProductUseCase.js";
import type { GetAllProductsUseCase } from "../../../application/use-cases/GetAllProductsUseCase.js";
import type { GetProductByIdUseCase } from "../../../application/use-cases/GetByIdProductUseCase.js";
import type { UpdateProductUseCase } from "../../../application/use-cases/UpdateProductUseCase.js";
import { ProductMapper } from "../../../application/mappers/ProductMappers.js";


const logger = new Logger("ProductController");
export class ProductController {

    constructor(
        private createProductUseCase: CreateProductUseCase,
        private getAllProductsUseCase: GetAllProductsUseCase,
        private getProductByIdUseCase: GetProductByIdUseCase,
        private updateProductUseCase: UpdateProductUseCase,
        private deleteProductUseCase: DeleteProductUseCase,
    ) { }

    async create(req: Request, res: Response) {

        const { name, brand, pricePerKg, stockKg, categoryId } = req.body

        const product = await this.createProductUseCase.execute({
            name,
            brand,
            pricePerKg,
            stockKg,
            categoryId
        })
        logger.info(`Product with name ${name} created successfully`);

        res.status(201).json(product)


    }

    async getAll(req: Request, res: Response) {

        const { category, brand, minPrice, maxPrice } = req.query;
        const products = await this.getAllProductsUseCase.execute({
            categoryId: category as string | undefined,
            brand: brand as string | undefined,
            minPrice: minPrice ? Number(minPrice) : undefined,
            maxPrice: maxPrice ? Number(maxPrice) : undefined,
            search: req.query.search as string | undefined
        })
        logger.info(`Retrieved ${products.length} products successfully`);

        const response = products.map(ProductMapper.toResponse)

        return res.json(response)
    }

    async getById(req: Request, res: Response) {

        const id = req.params.id;

        if (!id || Array.isArray(id)) {
            logger.warn("Invalid ID provided");
            return res.status(400).json({ message: "ID inválido" });
        }

        const product = await this.getProductByIdUseCase.execute(id);

        if (!product) {
            logger.info(`Product with ID ${id} not found`);
            return res.status(404).json({ message: "Produto não encontrado." });
        }

        logger.info(`Product with ID ${id} retrieved successfully`);
        return res.json(product);

    }

    async update(req: Request, res: Response) {

        const id = req.params.id;

        if (!id || Array.isArray(id)) {
            logger.warn("Invalid ID provided");
            return res.status(400).json({ message: "ID inválido" });
        }

        const data = req.body; // { name, price, description ... }

        const updatedProduct = await this.updateProductUseCase.execute(id, data);
        logger.info(`Product with ID ${id} updated successfully`);
        const product = await this.getProductByIdUseCase.execute(id);

        if (!product) {
            logger.info(`Product with ID ${id} not found`);
            return res.status(404).json({ message: "Produto não encontrado." });
        }
        const response = ProductMapper.toResponse(product);


        return res.json({ message: "Produto atualizado com sucesso", product: response });

    }

    async delete(req: Request, res: Response) {

        const id = req.params.id;

        if (!id || Array.isArray(id)) {
            logger.warn("Invalid ID provided");
            return res.status(400).json({ message: "ID inválido" });
        }

        await this.deleteProductUseCase.execute(id);
        logger.info(`Product with ID ${id} deleted successfully`);

        res.status(204).send();

    }
}