import type { User } from "../entities/User.js";


export interface IUserRepository {
    findById(id: string): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    findAll(): Promise<User[]>;
    findMe(id: string): Promise<User | null>;
    create(user: User): Promise<void>;
    update(id: string, user: Partial<User>): Promise<User>;
    updatePassword(id: string, password: string): Promise<void>;
    delete(id: string): Promise<void>;
}