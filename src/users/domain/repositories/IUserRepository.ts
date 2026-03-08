import type { User } from "../entities/User.js";


export interface IUserRepository {
    findById(id: string): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    findAll(): Promise<User[]>;
    create(user: User): Promise<void>;
    update(id: string, user: User): Promise<void>;
    updatePassword(id: string, password: string): Promise<void>;
    delete(id: string): Promise<void>;
}