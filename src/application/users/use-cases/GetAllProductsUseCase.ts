import type { IUserRepository } from "../../../domain/users/repositories/IUserRepository.js";

export class GetAllUsersUseCase {

    constructor(private repository: IUserRepository) { }

    async execute() {
        return await this.repository.findAll()
    }
}
