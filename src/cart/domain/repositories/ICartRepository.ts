import type { CartDTO } from "../../application/dto/CartDTO.js";
import type { Cart } from "../entities/Cart.js";


export interface ICartRepository {
  getCartByUserId(userId: string): Promise<Cart | null>;
  addItem(data: CartDTO): Promise<Cart>;
  create(cart: Cart): Promise<void>;
  updateItem(data: CartDTO): Promise<Cart>;
  removeItem(data: CartDTO): Promise<Cart>;
  clearCart(userId: string): Promise<void>;
}