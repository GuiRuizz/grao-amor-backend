import type { Orders } from "../../domain/entities/Orders.js";
import type { OrdersResponseDTO } from "./OrdersDTO.js";


export function toOrdersResponse(order: Orders): OrdersResponseDTO {
    return {
        id: order.id,
        paymentMethod: order.paymentMethod,
        value: order.value,
        status: order.status,
        items: order.items
    };
}

export function toOrdersAdminResponse(order: Orders) {
    return {
        userId: order.userId,
        userName: (order as any).userName, // só para Admin
        data: {
            id: order.id,
            paymentMethod: order.paymentMethod,
            value: order.value,
            status: order.status,
            items: order.items.map(item => ({
                id: item.id,
                orderId: order.id,
                productId: item.productId,
                quantity: item.quantity,
                price: item.price
            }))
        }
    };
}