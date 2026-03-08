import { CreateUserUseCase } from "../../users/application/use-cases/CreateUserUseCase.js";
import { DeleteUserUseCase } from "../application/use-cases/DeleteUserUseCase.js";
import { GetAllUsersUseCase } from "../application/use-cases/GetAllUsersUseCase.js";
import { GetUserByEmailUseCase } from "../application/use-cases/GetByEmailUserUseCase.js";
import { GetUserByIdUseCase } from "../application/use-cases/GetByIdUserUseCase.js";
import { UpdateUserUseCase } from "../application/use-cases/UpdateUserUseCase.js";

import { Logger } from "../../utils/Logger.js";
import { PrismaUserRepository } from "../infrastructure/repositories/PrismaUserRespository.js";
import { UpdatePasswordUserUseCase } from "../application/use-cases/UpdatePasswordUserUseCase.js";


// Cria uma instância do repositório
const userRepository = new PrismaUserRepository();
const logger = new Logger("UserUsecaseFactory");

// Cria instâncias de Use Cases
export const createUserUseCase = new CreateUserUseCase(userRepository);
export const getAllUsersUseCase = new GetAllUsersUseCase(userRepository);
export const getUserByIdUseCase = new GetUserByIdUseCase(userRepository);
export const updateUserUseCase = new UpdateUserUseCase(userRepository);
export const deleteUserUseCase = new DeleteUserUseCase(userRepository);
export const getUserByEmailUseCase = new GetUserByEmailUseCase(userRepository);
export const updatePasswordUserUseCase = new UpdatePasswordUserUseCase(userRepository);

logger.info("User Use Cases initialized successfully");
