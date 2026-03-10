import { prisma } from "../../../infrastructure/database/db.js";
import type { IOrdersRepository } from "../../domain/repositories/IOrdersRepository.js";
import { Logger } from "../../../utils/Logger.js";
import { Orders } from "../../domain/entities/Orders.js";
import { OrderStatus } from "../../../../generated/prisma/enums.js";
import { OrderItem } from "../../domain/entities/OrderItem.js";

const logger = new Logger("PrismaOrdersRepository");

export class PrismaOrdersRepository implements IOrdersRepository {

    async create(order: Orders): Promise<void> {
        await prisma.order.create({
            data: {
                id: order.id,
                userId: order.userId,
                status: order.status,
                paymentMethod: order.paymentMethod,
                total: order.value,
                items: {
                    create: order.items.map(item => ({
                        productId: item.productId,
                        quantity: item.quantity,
                        price: item.price
                    }))
                }
            }
        });

        logger.info(`Order ${order.id} created successfully`);
    }

    async findById(id: string): Promise<Orders | null> {
        const order = await prisma.order.findUnique({
            where: { id },
            include: { items: true }
        });

        if (!order) return null;

        logger.info(`Order ${id} retrieved successfully`);

        return new Orders(
            order.userId,
            order.paymentMethod,
            order.total,
            order.items,
            order.status,
            order.createdAt,
            order.updatedAt,
            order.id
        );
    }

    async findAll(page: number = 1, pageSize: number = 10): Promise<Orders[]> {
        const skip = (page - 1) * pageSize;

        const orders = await prisma.order.findMany({
            include: {
                items: true,
                user: { select: { id: true, name: true } },
            },
            skip,
            take: pageSize,
            orderBy: { createdAt: 'desc' } // opcional, os mais recentes primeiro
        });

        logger.info(`Retrieved ${orders.length} orders for page ${page}`);

        return orders.map(order => {
            const ordersEntity = new Orders(
                order.userId,
                order.paymentMethod,
                order.total,
                order.items.map(i => new OrderItem(i.productId, i.quantity, i.price, i.id)),
                order.status,
                order.createdAt,
                order.updatedAt,
                order.id
            );

            (ordersEntity as any).userName = order.user.name;
            return ordersEntity;
        });
    }

    async findByUserId(userId: string): Promise<Orders[]> {
        const orders = await prisma.order.findMany({
            where: { userId },
            include: { items: true }
        });

        return orders.map(order =>
            new Orders(
                order.userId,
                order.paymentMethod,
                order.total,
                order.items,
                order.status,
                order.createdAt,
                order.updatedAt,
                order.id
            )
        );
    }


    async updateStatus(id: string, status: OrderStatus): Promise<void> {
        await prisma.order.update({
            where: { id },
            data: {
                status: { set: status } // ✅ aqui você passa apenas o enum
            }
        });

        logger.info(`Order ${id} status updated to ${status}`);
    }

    async delete(id: string): Promise<void> {
        // Soft delete: apenas atualiza o status para CANCELED
        await prisma.order.update({
            where: { id },
            data: { status: { set: OrderStatus.CANCELED } }
        });

        logger.info(`Order ${id} soft deleted (status set to CANCELED)`);
    }
}