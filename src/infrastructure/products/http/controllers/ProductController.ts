import type { Request, Response } from "express"
import { CreateProductUseCase } from "../../../../application/products/use-cases/CreateProductUseCase.js"
import type { GetAllProductsUseCase } from "../../../../application/products/use-cases/GetAllProductsUseCase.js"
import type { GetProductByIdUseCase } from "../../../../application/products/use-cases/GetByIdProductUseCase.js"
import type { UpdateProductUseCase } from "../../../../application/products/use-cases/UpdateProductUseCase.js"
import type { DeleteProductUseCase } from "../../../../application/products/use-cases/DeleteProductUseCase.js"

export class ProductController {

    constructor(
        private createProductUseCase: CreateProductUseCase,
        private getAllProductsUseCase: GetAllProductsUseCase,
        private getProductByIdUseCase: GetProductByIdUseCase,
        private updateProductUseCase: UpdateProductUseCase,
        private deleteProductUseCase: DeleteProductUseCase
    ) { }

    async create(req: Request, res: Response) {
        try {

            const { name, brand, pricePerKg, stockKg } = req.body

            const product = await this.createProductUseCase.execute({
                name,
                brand,
                pricePerKg,
                stockKg
            })

            res.status(201).json(product)

        } catch (error) {
            res.status(500).json({ error: "Internal error" })
        }
    }

    async getAll(req: Request, res: Response) {
        try {
            const products = await this.getAllProductsUseCase.execute()
            res.status(200).json(products)
        } catch (error) {
            res.status(500).json({ error: "Internal error" })
        }
    }

    async getById(req: Request, res: Response) {
        try {
            const id = req.params.id;

            if (!id || Array.isArray(id)) {
                return res.status(400).json({ message: "ID inválido" });
            }

            const product = await this.getProductByIdUseCase.execute(id);

            if (!product) {
                return res.status(404).json({ message: "Produto não encontrado." });
            }

            return res.json(product);
        } catch (error: any) {
            return res.status(400).json({ message: error.message });
        }
    }

    async update(req: Request, res: Response) {
        try {
            const id = req.params.id;

            if (!id || Array.isArray(id)) {
                return res.status(400).json({ message: "ID inválido" });
            }

            const data = req.body; // { name, price, description ... }

            const updatedProduct = await this.updateProductUseCase.execute(id, data);

            return res.json({ message: "Produto atualizado com sucesso", product: updatedProduct });

        } catch (error: any) {
            return res.status(400).json({ message: error.message });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const id = req.params.id;

            if (!id || Array.isArray(id)) {
                return res.status(400).json({ message: "ID inválido" });
            }

            await this.deleteProductUseCase.execute(id);

            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: "Internal error" });
        }

    }
}