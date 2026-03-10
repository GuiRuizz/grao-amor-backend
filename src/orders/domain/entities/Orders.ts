import { v4 as uuidv4 } from "uuid";

import { OrderItem } from "./OrderItem.js";
import { PaymentMethod, OrderStatus } from "../../../../generated/prisma/enums.js";

export class Orders {
    public readonly id: string;

    constructor(
        public userId: string,
        public paymentMethod: PaymentMethod,
        public value: number,
        public items: OrderItem[],
        public status: OrderStatus = OrderStatus.PENDING,
        public createdAt: Date = new Date(),
        public updatedAt: Date = new Date(),
        id?: string
    ) {
        this.id = id ?? uuidv4();
    }
}