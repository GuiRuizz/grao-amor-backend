import type { IUserRepository } from "../../domain/repositories/IUserRepository.js";
import type { User } from "../../domain/entities/User.js";

export class GetMeUseCase {
    constructor(private userRepo: IUserRepository) { }

    async execute(userId: string): Promise<User | null> {
        if (!userId) throw new Error("UserId é obrigatório");
        return await this.userRepo.findMe(userId);
    }
}