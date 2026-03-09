import type { Request, Response } from "express"

import { Logger } from "../../../../utils/Logger.js"
import type { CreateCategoryUseCase } from "../../../application/use-cases/CreateCategoryUseCase.js";
import type { DeleteCategoryUseCase } from "../../../application/use-cases/DeleteCategoryUseCase.js";
import type { GetAllCategoriesUseCase } from "../../../application/use-cases/GetAllCategoryUseCase.js";
import type { GetCategoryByIdUseCase } from "../../../application/use-cases/GetByIdCategoryUseCase.js";
import type { UpdateCategoryUseCase } from "../../../application/use-cases/UpdateCategoryUseCase.js";


const logger = new Logger("CategoryController");
export class CategoryController {

    constructor(
        private createCategoryUseCase: CreateCategoryUseCase,
        private getAllCategoriesUseCase: GetAllCategoriesUseCase,
        private getCategoryByIdUseCase: GetCategoryByIdUseCase,
        private updateCategoryUseCase: UpdateCategoryUseCase,
        private deleteCategoryUseCase: DeleteCategoryUseCase,
    ) { }

    async create(req: Request, res: Response) {

        const { name, description } = req.body

        const category = await this.createCategoryUseCase.execute({
            name,
            description,

        })
        logger.info(`Category with name ${name} created successfully`);

        res.status(201).json(category)


    }

    async getAll(req: Request, res: Response) {

        const categories = await this.getAllCategoriesUseCase.execute()
        logger.info(`Retrieved ${categories.length} categories successfully`);
        res.status(200).json(categories)

    }

    async getById(req: Request, res: Response) {

        const id = req.params.id;

        if (!id || Array.isArray(id)) {
            logger.warn("Invalid ID provided");
            return res.status(400).json({ message: "ID inválido" });
        }

        const category = await this.getCategoryByIdUseCase.execute(id);

        if (!category) {
            logger.info(`Category with ID ${id} not found`);
            return res.status(404).json({ message: "Categoria não encontrada." });
        }

        logger.info(`Category with ID ${id} retrieved successfully`);
        return res.json(category);

    }

    async update(req: Request, res: Response) {

        const id = req.params.id;

        if (!id || Array.isArray(id)) {
            logger.warn("Invalid ID provided");
            return res.status(400).json({ message: "ID inválido" });
        }

        const data = req.body; // { name, price, description ... }

        const updatedCategory = await this.updateCategoryUseCase.execute(id, data);
        logger.info(`Category with ID ${id} updated successfully`);

        return res.json({ message: "Categoria atualizada com sucesso", category: updatedCategory });

    }

    async delete(req: Request, res: Response) {

        const id = req.params.id;

        if (!id || Array.isArray(id)) {
            logger.warn("Invalid ID provided");
            return res.status(400).json({ message: "ID inválido" });
        }

        await this.deleteCategoryUseCase.execute(id);
        logger.info(`Category with ID ${id} deleted successfully`);

        res.status(204).send();

    }
}