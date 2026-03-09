import { Logger } from "../../../utils/Logger.js";
import { prisma } from "../../../infrastructure/database/db.js";

import { Cart, CartItem } from "../../../cart/domain/entities/Cart.js";
import type { CartDTO } from "../../application/dto/CartDTO.js";
import { AppError } from "../../../utils/AppError.js";
import { nowBrazil } from "../../../utils/TimeZoneConvert.js";

export class PrismaCartRepository {
    private logger = new Logger("PrismaCartRepository");

    async create(cart: Cart): Promise<void> {
        this.logger.info(`Criando carrinho para usuário ID: ${cart.userId}`);

        await prisma.cart.create({
            data: {
                id: cart.id,
                userId: cart.userId,
                createdAt: nowBrazil(),
                updatedAt: nowBrazil(),
                items: {
                    create: cart.items.map(i => ({
                        id: i.id,
                        productId: i.productId,
                        quantity: i.quantity,
                    })),
                },
            },
        });

        this.logger.info(`Carrinho criado com sucesso para usuário ID: ${cart.userId}`);
    }

    async getCartByUserId(userId: string): Promise<Cart | null> {
        this.logger.info(`Buscando carrinho do usuário ID: ${userId}`);

        const cartData = await prisma.cart.findUnique({
            where: { userId },
            include: { items: true },
        });

        if (!cartData) return null;

        const items = cartData.items.map(
            i => new CartItem(i.productId, i.quantity, i.id)
        );

        return new Cart(
            cartData.userId,
            items,
            cartData.createdAt,
            cartData.updatedAt,
            cartData.id
        );
    }

    async addItem(data: CartDTO): Promise<Cart> {
        const { userId, productId, quantity } = data;

        let cart = await this.getCartByUserId(userId);

        if (!cart) {
            cart = new Cart(userId, [new CartItem(productId, quantity)]);
            await this.create(cart);
            return cart;
        }

        const existingItem = cart.items.find(i => i.productId === productId);

        if (existingItem) {
            existingItem.quantity += quantity;

            await prisma.cartItem.update({
                where: { id: existingItem.id },
                data: { quantity: existingItem.quantity },
            });

        } else {
            const item = new CartItem(productId, quantity);

            await prisma.cartItem.create({
                data: {
                    id: item.id,
                    cartId: cart.id,
                    productId,
                    quantity,
                },
            });

            cart.items.push(item);
        }

        await prisma.cart.update({
            where: {
                id: cart.id
            },
            data: {
                updatedAt: nowBrazil()
            }
        });


        return cart;
    }

    async updateItem(data: CartDTO): Promise<Cart> {
        const { userId, productId, quantity } = data;

        const cart = await this.getCartByUserId(userId);
        if (!cart) throw new AppError("Carrinho não encontrado", 404);

        const item = cart.items.find(i => i.productId === productId);
        if (!item) throw new AppError("Item não encontrado", 404);

        this.logger.info(nowBrazil().toISOString());

        await prisma.$transaction([
            prisma.cartItem.update({
                where: {
                    id: item.id
                },
                data: {
                    quantity
                }
            }),

            prisma.cart.update({
                where: {
                    id: cart.id
                },
                data: {
                    updatedAt: nowBrazil()
                }
            })
        ]);

        return this.getCartByUserId(userId) as Promise<Cart>;
    }

    async removeItem(data: CartDTO): Promise<Cart> {
        const { userId, productId } = data;

        const cart = await this.getCartByUserId(userId);
        if (!cart) throw new AppError("Carrinho não encontrado", 404);

        const item = cart.items.find(i => i.productId === productId);
        if (!item) throw new AppError("Item não encontrado", 404);

        await prisma.cartItem.delete({
            where: { id: item.id },
        });

        prisma.cart.update({
            where: {
                id: cart.id
            },
            data: {
                updatedAt: nowBrazil()
            }
        })

        cart.items = cart.items.filter(i => i.id !== item.id);

        return cart;
    }

    async clearCart(userId: string): Promise<void> {
        const cart = await this.getCartByUserId(userId);
        if (!cart) throw new AppError("Carrinho não encontrado", 404);

        await prisma.cartItem.deleteMany({
            where: { cartId: cart.id },
        });
        prisma.cart.update({
            where: {
                id: cart.id
            },
            data: {
                updatedAt: nowBrazil()
            }
        })
    }
}