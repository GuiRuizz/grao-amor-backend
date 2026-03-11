import { prisma } from "../../../infrastructure/database/db.js";

import { Logger } from "../../../utils/Logger.js";
import { Payment } from "../../domain/entities/Payment.js";
import { PaymentStatus } from "../../../../generated/prisma/enums.js";
import type { IPaymentsRepository } from "../../domain/repositories/IPaymentRepository.js";

const logger = new Logger("PrismaPaymentsRepository");

export class PrismaPaymentsRepository implements IPaymentsRepository {

    async create(payment: Payment): Promise<void> {
        await prisma.payment.create({
            data: {
                id: payment.id,
                orderId: payment.orderId,
                provider: payment.provider,
                providerRef: payment.providerRef,
                amount: payment.amount,
                status: payment.status
            }
        });

        logger.info(`Payment ${payment.id} created successfully`);
    }

    async findByProviderRef(providerRef: string): Promise<Payment | null> {

        const payment = await prisma.payment.findFirst({
            where: {
                providerRef: providerRef
            }
        });

        if (!payment) return null;

        return new Payment(
            payment.orderId,
            payment.provider,
            payment.amount,
            payment.status,
            payment.providerRef ?? undefined,
            payment.createdAt,
            payment.updatedAt,
            payment.id
        );
    }

    async findPendingByOrderId(orderId: string): Promise<Payment | null> {
        const payment = await prisma.payment.findFirst({
            where: {
                orderId,
                status: "PENDING"
            }
        });

        if (!payment) return null;

        return new Payment(
            payment.orderId,
            payment.provider,
            payment.amount,
            payment.status,
            payment.providerRef ?? undefined,
            payment.createdAt,
            payment.updatedAt,
            payment.id
        );
    }

    async findById(id: string): Promise<Payment | null> {
        const payment = await prisma.payment.findUnique({
            where: { id }
        });

        if (!payment) return null;

        logger.info(`Payment ${id} retrieved successfully`);

        return new Payment(
            payment.orderId,
            payment.provider,
            payment.amount,
            payment.status,
            payment.providerRef ?? undefined,
            payment.createdAt,
            payment.updatedAt,
            payment.id
        );
    }

    async findByOrderId(orderId: string): Promise<Payment[]> {
        const payments = await prisma.payment.findMany({
            where: { orderId }
        });

        logger.info(`Retrieved ${payments.length} payments for order ${orderId}`);

        return payments.map(payment =>
            new Payment(
                payment.orderId,
                payment.provider,
                payment.amount,
                payment.status,
                payment.providerRef ?? undefined,
                payment.createdAt,
                payment.updatedAt,
                payment.id
            )
        );
    }

    async updateStatus(providerRef: string, status: PaymentStatus): Promise<void> {

        await prisma.payment.updateMany({
            where: {
                providerRef: providerRef
            },
            data: {
                status: status
            }
        });
    }

    async updateProviderRef(id: string, providerRef: string): Promise<void> {
        await prisma.payment.update({
            where: { id },
            data: {
                providerRef
            }
        });

        logger.info(`Payment ${id} providerRef updated`);
    }
}