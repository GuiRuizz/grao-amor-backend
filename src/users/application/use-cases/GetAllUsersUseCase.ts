import type { IUserRepository } from "../../domain/repositories/IUserRepository.js";
import { Logger } from "../../../utils/Logger.js";

const logger = new Logger("GetAllUsersUseCase");

export class GetAllUsersUseCase {

    constructor(private repository: IUserRepository) { }

    async execute() {
        logger.info("Retrieving all users");
        return await this.repository.findAll()
    }
}
