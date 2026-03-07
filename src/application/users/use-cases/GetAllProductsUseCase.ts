import type { IUserRepository } from "../../../domain/users/repositories/IUserRepository.js";
import type { Logger } from "../../../utils/Logger.js";

export class GetAllUsersUseCase {

    constructor(private repository: IUserRepository, private logger: Logger) { }

    async execute() {
        this.logger.info("Retrieving all users");
        return await this.repository.findAll()
    }
}
