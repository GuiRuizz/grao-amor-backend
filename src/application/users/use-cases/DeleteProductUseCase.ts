import type { User } from "../../../domain/users/entities/User.js";
import type { IUserRepository } from "../../../domain/users/repositories/IUserRepository.js";


export class DeleteUserUseCase {
    private userRepo: IUserRepository;

    constructor(userRepo: IUserRepository) {
        this.userRepo = userRepo;
    }

    async execute(id: string): Promise<User | null> {
        // Validação simples
        if (!id || typeof id !== "string") {
            throw new Error("ID inválido.");
        }

        // Busca o usuário no repositório
        const user = await this.userRepo.findById(id);

        if (!user) {
            throw new Error("Usuário não encontrado.");
        }

        // Deleta o usuário
        await this.userRepo.delete(id);

        // Retorna o usuário deletado (opcional, útil para logs ou confirmação)
        return user;
    }
}