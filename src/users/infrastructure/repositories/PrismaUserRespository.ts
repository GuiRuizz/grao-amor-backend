
import { prisma } from "../../../infrastructure/database/db.js";
import type { IUserRepository } from "../../../users/domain/repositories/IUserRepository.js";
import { Logger } from "../../../utils/Logger.js";
import { User } from "../../domain/entities/User.js";

const logger = new Logger("PrismaUserRepository");
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
        logger.info(`User with email ${user.email} created successfully in the database`);
    }

    async findByEmail(email: string): Promise<User | null> {
        const user = await prisma.user.findUnique({
            where: { email }
        });

        if (!user) return null;

        logger.info(`User with email ${email} retrieved successfully from the database`);

        return new User(
            user.name,
            user.email,
            user.password,
            user.profilePhoto!,
            user.type as "USER" | "ADMIN",
            user.isActive,
            user.createdAt,
            user.updatedAt,
            user.id
        );
    }

    async findMe(id: string): Promise<User | null> {
        const user = await prisma.user.findUnique({
            where: { id }
        });

        if (!user) return null;

        logger.info(`User with ID ${id} retrieved successfully from the database`);

        return new User(
            user.name,
            user.email,
            user.password,
            user.profilePhoto!,
            user.type as "USER" | "ADMIN",
            user.isActive,
            user.createdAt,
            user.updatedAt,
            user.id,
        );
    }

    async findById(id: string): Promise<User | null> {
        const user = await prisma.user.findUnique({
            where: { id }
        });

        if (!user) return null;

        logger.info(`User with ID ${id} retrieved successfully from the database`);

        return new User(
            user.name,
            user.email,
            user.password,
            user.profilePhoto!,
            user.type as "USER" | "ADMIN",
            user.isActive,
            user.createdAt,
            user.updatedAt,
            user.id,

        );
    }

    async findAll(): Promise<User[]> {
        const users = await prisma.user.findMany();

        logger.info(`Retrieved ${users.length} users from the database`);

        return users.map(u =>
            new User(
                u.name,
                u.email,
                u.password,
                u.profilePhoto!,
                u.type as "USER" | "ADMIN",
                u.isActive,
                u.createdAt,
                u.updatedAt,
                u.id
            ),

            logger.info(`Mapped ${users.length} users to User entities`)
        );
    }

    async delete(id: string): Promise<void> {
        await prisma.user.delete({
            where: { id }
        });
        logger.info(`User with ID ${id} deleted successfully`);
    }

    async update(id: string, user: Partial<User>): Promise<User> {
        const updatedUser = await prisma.user.update({
            where: { id },
            data: {
                ...(user.name && { name: user.name }),
                ...(user.email && { email: user.email }),
                ...(user.profilePhoto && { profilePhoto: user.profilePhoto }),
            }
        });

        logger.info(`User with ID ${id} updated successfully`);

        return {
            ...updatedUser,
            type: updatedUser.type as "ADMIN" | "USER", // 👈 resolve o erro
        };
    }

    async updatePassword(id: string, password: string): Promise<void> {
        await prisma.user.update({
            where: { id },
            data: {
                password
            }
        });
        logger.info(`Password for user with ID ${id} updated successfully`);
    }
}