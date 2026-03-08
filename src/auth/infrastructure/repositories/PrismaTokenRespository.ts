import { prisma } from "../../../infrastructure/database/db.js";
import type { ITokenRepository } from "../../domain/repositories/IAuthRepository.js";
import dayjs from "dayjs";


export class PrismaTokenRepository implements ITokenRepository {

    async saveRefreshToken(userId: string, token: string): Promise<void> {
        await prisma.refreshToken.create({
            data: {
                userId,
                token: token,
                expiresAt: dayjs().add(7, "day").toDate(), // expira em 7 dias
            },
        });
    }

    async findRefreshToken(token: string): Promise<string | null> {
        const record = await prisma.refreshToken.findUnique({
            where: { token }
        });
        return record?.token || null;
    }

    async deleteRefreshToken(token: string): Promise<void> {
        await prisma.refreshToken.delete({
            where: { token }
        });
    }
}