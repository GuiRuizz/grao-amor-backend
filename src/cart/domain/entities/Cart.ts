import { v4 as uuidv4 } from "uuid";

export class CartItem {
    public readonly id: string;

    constructor(
        public productId: string,
        public quantity: number,
        id?: string
    ) {
        this.id = id ?? uuidv4();
    }
}

export class Cart {
    public readonly id: string;
    public items: CartItem[] = [];
    public createdAt: Date;
    public updatedAt: Date;

    constructor(
        public userId: string,
        items?: CartItem[],
        createdAt?: Date,
        updatedAt?: Date,
        id?: string
    ) {
        this.id = id ?? uuidv4();
        if (items) this.items = items;
        this.createdAt = createdAt ?? new Date();
        this.updatedAt = updatedAt ?? new Date();
    }
}