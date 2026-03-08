import { Product } from "../entities/Product.js";

export interface IProductRepository {
    findById(id: string): Promise<Product | null>;
    findAll(): Promise<Product[]>;
    create(product: Product): Promise<void>;
    update(id: string, product: Product): Promise<void>;
    delete(id: string): Promise<void>;
}