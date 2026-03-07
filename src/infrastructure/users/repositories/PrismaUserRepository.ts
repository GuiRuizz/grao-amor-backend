import { prisma } from "../../database/db.js";
import { User } from "../../../domain/users/entities/User.js";
import type { IUserRepository } from "../../../domain/users/repositories/IUserRepository.js";
import { createLogger } from "../../../utils/factories/LoggerFactory.js";

export class PrismaUserRepository implements IUserRepository {

    private logger = createLogger();

    async create(user: User): Promise<void> {
        await prisma.user.create({
            data: {
                id: user.id,
                name: user.name,
                email: user.email,
                password: user.password
            }
        });
        this.logger.info(`User with email ${user.email} created successfully in the database`);
    }

    async findByEmail(email: string): Promise<User | null> {
        const user = await prisma.user.findUnique({
            where: { email }
        });

        if (!user) return null;

        this.logger.info(`User with email ${email} retrieved successfully from the database`);

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

        this.logger.info(`User with ID ${id} retrieved successfully from the database`);

        return new User(
            user.name,
            user.email,
            user.password,
            user.id
        );
    }

    async findAll(): Promise<User[]> {
        const users = await prisma.user.findMany();

        this.logger.info(`Retrieved ${users.length} users from the database`);

        return users.map(u =>
            new User(
                u.name,
                u.email,
                u.password,
                u.id
            ),

            this.logger.info(`Mapped ${users.length} users to User entities`)
        );
    }

    async delete(id: string): Promise<void> {
        await prisma.user.delete({
            where: { id }
        });
        this.logger.info(`User with ID ${id} deleted successfully`);
    }

    async update(id: string, user: User): Promise<void> {
        await prisma.user.update({
            where: { id },
            data: {
                name: user.name,
                email: user.email,
            }
        });
        this.logger.info(`User with ID ${id} updated successfully`);
    }
}