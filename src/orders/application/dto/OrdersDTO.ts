import type { PaymentMethod, OrderStatus } from "../../../../generated/prisma/enums.js"
import type { Cart } from "../../../cart/domain/entities/Cart.js"
import type { OrderItem } from "../../domain/entities/OrderItem.js"


export interface CreateOrderDTO {
    userId: string
    paymentMethod: PaymentMethod
}

export interface OrdersResponseDTO {
    id: string
    paymentMethod: PaymentMethod
    value: number 
    status: OrderStatus
    items: OrderItem[]
}