import { v4 as uuidv4 } from "uuid";

export class OrderItem {
    public readonly id: string;

    constructor(
        public productId: string,
        public quantity: number,
        public price: number,
        id?: string
    ) {
        this.id = id ?? uuidv4();
    }
}