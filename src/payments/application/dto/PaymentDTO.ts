import type { PaymentMethod } from "../../../../generated/prisma/enums.js";

export interface PaymentItemDTO {
  id: string;          // seu ID interno do produto
  title: string;       // nome do produto
  quantity: number;
  unit_price: number;
}

export interface CreatePaymentDTO {
  orderId: string;       // seu ID interno do pedido
  payerEmail: string;
  items: PaymentItemDTO[];
  paymentMethod: PaymentMethod
}