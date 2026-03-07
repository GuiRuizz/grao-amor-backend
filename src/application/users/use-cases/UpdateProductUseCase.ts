import type { User } from "../../../domain/users/entities/User.js";
import type { IUserRepository } from "../../../domain/users/repositories/IUserRepository.js";
import type { UserDTO } from "../dto/UserDTO.js";

export class UpdateUserUseCase {
    private userRepo: IUserRepository;

    constructor(userRepo: IUserRepository) {
        this.userRepo = userRepo;
    }

    async execute(id: string, data: UserDTO): Promise<User | null> {
        // Validação básica
        if (!id || typeof id !== "string") {
            throw new Error("ID inválido.");
        }

        if (!data || Object.keys(data).length === 0) {
            throw new Error("Nenhum dado para atualizar.");
        }

        // Busca o usuário no repositório
        const user = await this.userRepo.findById(id);

        if (!user) {
            throw new Error("Usuário não encontrado.");
        }

        // Atualiza os campos do usuário
        const updatedUser = { ...user, ...data };

        // Salva no repositório
        await this.userRepo.update(id, updatedUser);

        return updatedUser;
    }
}