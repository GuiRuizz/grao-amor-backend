import type { ProductDTO } from "../../../application/products/dto/ProductDTO.js";
import { Product } from "../../../domain/products/entities/Product.js";
import { Logger } from "../../../utils/Logger.js";
import { prisma } from "../../database/db.js";


export class PrismaProductRepository {
    private logger = new Logger("PrismaProductRepository");

    async findAll(): Promise<Product[]> {
        this.logger.info("Buscando todos os produtos...");
        const data: ProductDTO[] = await prisma.product.findMany({
            select: {
                id: true,
                name: true,
                brand: true,
                pricePerKg: true,
                stockKg: true,
            },
        });

        this.logger.info(`Encontrados ${data.length} produtos.`);
        return data.map(p => new Product(
            p.name,
            p.brand,
            p.pricePerKg,
            p.stockKg,
            p.id
        ));
    }

    async findById(id: string): Promise<Product | null> {
        this.logger.info(`Buscando produto pelo ID: ${id}`);
        const p: ProductDTO | null = await prisma.product.findUnique({
            where: { id },
            select: {
                id: true,
                name: true,
                brand: true,
                pricePerKg: true,
                stockKg: true,
            },
        });

        if (!p) {
            this.logger.warn(`Produto com ID ${id} não encontrado.`);
            return null;
        }

        this.logger.info(`Produto com ID ${id} encontrado.`);
        return new Product(p.name, p.brand, p.pricePerKg, p.stockKg, p.id);
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