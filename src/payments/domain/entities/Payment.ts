import { v4 as uuidv4 } from "uuid";
import type { PaymentStatus } from "../../../../generated/prisma/enums.js";

export class Payment {
    public readonly id: string;

    constructor(
        public orderId: string,
        public provider: string,
        public amount: number,
        public status: PaymentStatus,
        public providerRef?: string,
        public createdAt?: Date,
        public updatedAt?: Date,
        id?: string
    ) {
        this.id = id ?? uuidv4();
    }
}