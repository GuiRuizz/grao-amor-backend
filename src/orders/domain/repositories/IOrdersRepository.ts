
import type { OrderStatus } from "../../../../generated/prisma/client.js";
import type { Orders } from "../entities/Orders.js";


export interface IOrdersRepository {
    findById(id: string): Promise<Orders | null>;
    findByUserId(userId: string): Promise<Orders[]>;    
    findAll(page: number, pageSize: number): Promise<Orders[]>;
    create(order: Orders): Promise<void>;
    updateStatus(id: string, status: OrderStatus): Promise<void>;
    delete(id: string): Promise<void>;
}