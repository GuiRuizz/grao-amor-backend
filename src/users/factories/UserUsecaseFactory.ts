import { CreateUserUseCase } from "../../users/application/use-cases/CreateUserUseCase.js";
import { DeleteUserUseCase } from "../../users/application/use-cases/DeleteProductUseCase.js";
import { GetAllUsersUseCase } from "../../users/application/use-cases/GetAllProductsUseCase.js";
import { GetUserByEmailUseCase } from "../../users/application/use-cases/GetByEmailProductUseCase.js";
import { GetUserByIdUseCase } from "../../users/application/use-cases/GetByIdProductUseCase.js";
import { UpdateUserUseCase } from "../../users/application/use-cases/UpdateProductUseCase.js";

import { Logger } from "../../utils/Logger.js";
import { PrismaUserRepository } from "../infrastructure/repositories/PrismaUserRespository.js";


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

logger.info("User Use Cases initialized successfully");
