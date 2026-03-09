import type { ProductFilterDTO } from "../../application/dto/ProductFilterDTO.js";
import { Product } from "../entities/Product.js";

export interface IProductRepository {
    findById(id: string): Promise<Product | null>;
    findAll(filters?: ProductFilterDTO): Promise<Product[]>;
    create(product: Product): Promise<void>;
    update(id: string, product: Product): Promise<void>;
    delete(id: string): Promise<void>;
}