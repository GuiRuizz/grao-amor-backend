
import { Product } from "../../domain/entities/Product.js";
import { Logger } from "../../../utils/Logger.js";
import { prisma } from "../../../infrastructure/database/db.js";
import type { ProductFilterDTO } from "../../application/dto/ProductFilterDTO.js";



export class PrismaProductRepository {
    private logger = new Logger("PrismaProductRepository");

    async findAll(filters?: ProductFilterDTO) {
        this.logger.info("Buscando todos os produtos...");

        const where: any = {}

        if (filters?.categoryId) {
            where.categoryId = filters.categoryId
        }

        if (filters?.brand) {
            where.brand = {
                contains: filters.brand,
                mode: "insensitive"
            }
        }

        if (filters?.minPrice) {
            where.pricePerKg = { gte: filters.minPrice }
        }

        if (filters?.maxPrice) {
            where.pricePerKg = { ...where.pricePerKg, lte: filters.maxPrice }
        }

        const products = await prisma.product.findMany({
            where,
            include: {
                category: {
                    select: {
                        id: false,
                        name: true,
                        description: true
                    }
                }
            }
        })

        this.logger.info(`Encontrados ${products.length} produtos.`);

        return products;
    }

    async findById(id: string): Promise<any | null> {
        this.logger.info(`Buscando produto pelo ID: ${id}`);

        const product = await prisma.product.findUnique({
            where: { id },
            include: {
                category: {
                    select: {
                        id: true,
                        name: true,
                        description: true
                    }
                }
            }
        });

        if (!product) {
            this.logger.warn(`Produto com ID ${id} não encontrado.`);
            return null;
        }

        return product;
    }

    async create(product: Product): Promise<void> {
        this.logger.info(`Criando produto: ${product.name}`);
        await prisma.product.create({
            data: {
                id: product.id,
                name: product.name,
                brand: product.brand,
                pricePerKg: product.pricePerKg,
                stockKg: product.stockKg,
                categoryId: product.categoryId,
            },
        });
        this.logger.info(`Produto ${product.name} criado com sucesso.`);
    }

    async update(id: string, product: Product): Promise<void> {
        this.logger.info(`Atualizando produto ID ${id}...`);
        await prisma.product.update({
            where: { id },
            data: {
                name: product.name,
                brand: product.brand,
                pricePerKg: product.pricePerKg,
                stockKg: product.stockKg,
                categoryId: product.categoryId,
            },
        });
        this.logger.info(`Produto ID ${id} atualizado.`);
    }

    async delete(id: string): Promise<void> {
        this.logger.info(`Deletando produto ID ${id}...`);
        await prisma.product.delete({
            where: { id },
        });
        this.logger.info(`Produto ID ${id} deletado.`);
    }
}