import { prisma } from "../../database/db.js";
import { User } from "../../../domain/users/entities/User.js";
import type { IUserRepository } from "../../../domain/users/repositories/IUserRepository.js";

export class PrismaUserRepository implements IUserRepository {

    async create(user: User): Promise<void> {
        await prisma.user.create({
            data: {
                id: user.id,
                name: user.name,
                email: user.email,
                password: user.password
            }
        });
    }

    async findByEmail(email: string): Promise<User | null> {
        const user = await prisma.user.findUnique({
            where: { email }
        });

        if (!user) return null;

        return new User(
            user.name,
            user.email,
            user.password,
            user.id
        );
    }

    async findById(id: string): Promise<User | null> {
        const user = await prisma.user.findUnique({
            where: { id }
        });

        if (!user) return null;

        return new User(
            user.name,
            user.email,
            user.password,
            user.id
        );
    }

    async findAll(): Promise<User[]> {
        const users = await prisma.user.findMany();

        return users.map(u =>
            new User(
                u.name,
                u.email,
                u.password,
                u.id
            )
        );
    }

    async delete(id: string): Promise<void> {
        await prisma.user.delete({
            where: { id }
        });
    }

    async update(id: string, user: User): Promise<void> {
        await prisma.user.update({
            where: { id },
            data: {
                name: user.name,
                email: user.email,
            }
        });
    }
}