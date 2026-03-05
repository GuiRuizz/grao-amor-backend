import type { ProductDTO } from "../../../application/products/dto/ProductDTO.js";
import { Product } from "../../../domain/products/entities/Product.js";
import { prisma } from "../../database/db.js";


export class PrismaProductRepository {

    async findAll(): Promise<Product[]> {
        // Seleciona apenas os campos que interessam
        const data: ProductDTO[] = await prisma.product.findMany({
            select: {
                id: true,
                name: true,
                brand: true,
                pricePerKg: true,
                stockKg: true,
            },
        });

        // Converte DTO → Entidade de domínio
        return data.map(p => new Product(
            p.name,
            p.brand,
            p.pricePerKg,
            p.stockKg,
            p.id
        ));
    }

    async findById(id: string): Promise<Product | null> {
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

        if (!p) return null;

        return new Product(p.name, p.brand, p.pricePerKg, p.stockKg, p.id);
    }

    async create(product: Product): Promise<void> {
        await prisma.product.create({
            data: {
                id: product.id, // já deve ser UUID gerado pela entidade
                name: product.name,
                brand: product.brand,
                pricePerKg: product.pricePerKg,
                stockKg: product.stockKg,
            },
        });
    }

    async update(id: string, product: Product): Promise<void> {
        await prisma.product.update({
            where: { id },
            data: {
                name: product.name,
                brand: product.brand,
                pricePerKg: product.pricePerKg,
                stockKg: product.stockKg,
            },
        });
    }

    async delete(id: string): Promise<void> {
        await prisma.product.delete({
            where: { id },
        });
    }
}