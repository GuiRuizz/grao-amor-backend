import type { Request, Response } from "express"
import { CreateProductUseCase } from "../../../../application/products/use-cases/CreateProductUseCase.js"
import type { GetAllProductsUseCase } from "../../../../application/products/use-cases/GetAllProductsUseCase.js"
import type { GetProductByIdUseCase } from "../../../../application/products/use-cases/GetByIdProductUseCase.js"
import type { UpdateProductUseCase } from "../../../../application/products/use-cases/UpdateProductUseCase.js"
import type { DeleteProductUseCase } from "../../../../application/products/use-cases/DeleteProductUseCase.js"
import { createLogger } from "../../../../utils/factories/LoggerFactory.js"


export class ProductController {

    private logger = createLogger();
    constructor(
        private createProductUseCase: CreateProductUseCase,
        private getAllProductsUseCase: GetAllProductsUseCase,
        private getProductByIdUseCase: GetProductByIdUseCase,
        private updateProductUseCase: UpdateProductUseCase,
        private deleteProductUseCase: DeleteProductUseCase,
    ) { }

    async create(req: Request, res: Response) {

        const { name, brand, pricePerKg, stockKg } = req.body

        const product = await this.createProductUseCase.execute({
            name,
            brand,
            pricePerKg,
            stockKg
        })
        this.logger.info(`Product with name ${name} created successfully`);

        res.status(201).json(product)


    }

    async getAll(req: Request, res: Response) {

        const products = await this.getAllProductsUseCase.execute()
        this.logger.info(`Retrieved ${products.length} products successfully`);
        res.status(200).json(products)

    }

    async getById(req: Request, res: Response) {

        const id = req.params.id;

        if (!id || Array.isArray(id)) {
            this.logger.warn("Invalid ID provided");
            return res.status(400).json({ message: "ID inválido" });
        }

        const product = await this.getProductByIdUseCase.execute(id);

        if (!product) {
            this.logger.info(`Product with ID ${id} not found`);
            return res.status(404).json({ message: "Produto não encontrado." });
        }

        this.logger.info(`Product with ID ${id} retrieved successfully`);
        return res.json(product);

    }

    async update(req: Request, res: Response) {

        const id = req.params.id;

        if (!id || Array.isArray(id)) {
            this.logger.warn("Invalid ID provided");
            return res.status(400).json({ message: "ID inválido" });
        }

        const data = req.body; // { name, price, description ... }

        const updatedProduct = await this.updateProductUseCase.execute(id, data);
        this.logger.info(`Product with ID ${id} updated successfully`);

        return res.json({ message: "Produto atualizado com sucesso", product: updatedProduct });

    }

    async delete(req: Request, res: Response) {

        const id = req.params.id;

        if (!id || Array.isArray(id)) {
            this.logger.warn("Invalid ID provided");
            return res.status(400).json({ message: "ID inválido" });
        }

        await this.deleteProductUseCase.execute(id);
        this.logger.info(`Product with ID ${id} deleted successfully`);

        res.status(204).send();

    }
}