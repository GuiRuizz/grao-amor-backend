import { Category } from "../entities/Category.js";

export interface ICategoryRepository {
    findById(id: string): Promise<Category | null>;
    findAll(): Promise<Category[]>;
    create(category: Category): Promise<void>;
    update(id: string, category: Category): Promise<void>;
    delete(id: string): Promise<void>;
}