
import { Category } from "../../domain/entities/Category.js";
import { Logger } from "../../../utils/Logger.js";
import { prisma } from "../../../infrastructure/database/db.js";
import type { CategoryDTO } from "../../application/dto/CategoryDTO.js";



export class PrismaCategoryRepository {
    private logger = new Logger("PrismaCategoryRepository");

    async findAll(): Promise<Category[]> {
        this.logger.info("Buscando todos os produtos...");
        const data: CategoryDTO[] = await prisma.category.findMany({
            select: {
                id: true,
                name: true,
                description: true,
            },
        });

        this.logger.info(`Encontrados ${data.length} produtos.`);
        return data.map(p => new Category(
            p.name,
            p.description,
            p.id
        ));
    }

    async findById(id: string): Promise<Category | null> {
        this.logger.info(`Buscando categoria pelo ID: ${id}`);
        const p: CategoryDTO | null = await prisma.category.findUnique({
            where: { id },
            select: {
                id: true,
                name: true,
                description: true,
            },
        });

        if (!p) {
            this.logger.warn(`Categoria com ID ${id} não encontrada.`);
            return null;
        }

        this.logger.info(`Categoria com ID ${id} encontrada.`);
        return new Category(p.name, p.description, p.id);
    }

    async create(category: Category): Promise<void> {
        this.logger.info(`Criando categoria: ${category.name}`);
        await prisma.category.create({
            data: {
                id: category.id,
                name: category.name,
                description: category.description,
            },
        });
        this.logger.info(`Categoria ${category.name} criada com sucesso.`);
    }

    async update(id: string, category: Category): Promise<void> {
        this.logger.info(`Atualizando categoria ID ${id}...`);
        await prisma.category.update({
            where: { id },
            data: {
                name: category.name,
                description: category.description,
            },
        });
        this.logger.info(`Categoria ID ${id} atualizada.`);
    }

    async delete(id: string): Promise<void> {
        this.logger.info(`Deletando categoria ID ${id}...`);
        await prisma.category.delete({
            where: { id },
        });
        this.logger.info(`Categoria ID ${id} deletada.`);
    }
}