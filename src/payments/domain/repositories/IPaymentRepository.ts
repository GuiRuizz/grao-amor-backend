import { Payment } from "../entities/Payment.js";
import { PaymentStatus } from "../../../../generated/prisma/enums.js";

export interface IPaymentsRepository {
    create(payment: Payment): Promise<void>;
    findById(id: string): Promise<Payment | null>;
    findByOrderId(orderId: string): Promise<Payment[]>;
    updateStatus(id: string, status: PaymentStatus): Promise<void>;
    findById(id: string): Promise<any | null>;
    findPendingByOrderId(orderId: string): Promise<Payment | null>
    findByProviderRef(providerRef: string): Promise<Payment | null>
}
