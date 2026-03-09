

import { Logger } from "../../utils/Logger.js";
import { AddItemToCartUseCase } from "../application/use-cases/AddItemToCartUseCase.js";
import { ClearCartUseCase } from "../application/use-cases/ClearCartUseCase.js";
import { CreateCartUseCase } from "../application/use-cases/CreatecartUseCase.js";
import { GetCartUseCase } from "../application/use-cases/GetCartUseCase.js";
import { RemoveItemUseCase } from "../application/use-cases/RemoveItemUseCase.js";
import { UpdateItemUseCase } from "../application/use-cases/UpdateItemUseCase.js";
import { PrismaCartRepository } from "../infrastructure/repositories/PrismaCartRespository.js";



// Cria uma instância do repositório
const cartRepository = new PrismaCartRepository();
const logger = new Logger("CartUsecaseFactory");

// Cria instâncias de Use Cases
export const addItemToCartUseCase = new AddItemToCartUseCase(cartRepository);
export const getCartsUseCase = new GetCartUseCase(cartRepository);
export const removeItemFromCartUseCase = new RemoveItemUseCase(cartRepository);
export const updateItemInCartUseCase = new UpdateItemUseCase(cartRepository);
export const clearCartUseCase = new ClearCartUseCase(cartRepository);
export const createCartUseCase = new CreateCartUseCase(cartRepository);


logger.info("Cart Use Cases initialized successfully");
