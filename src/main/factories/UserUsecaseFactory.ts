import { CreateUserUseCase } from "../../application/users/use-cases/CreateUserUseCase.js";
import { DeleteUserUseCase } from "../../application/users/use-cases/DeleteProductUseCase.js";
import { GetAllUsersUseCase } from "../../application/users/use-cases/GetAllProductsUseCase.js";
import { GetUserByEmailUseCase } from "../../application/users/use-cases/GetByEmailProductUseCase.js";
import { GetUserByIdUseCase } from "../../application/users/use-cases/GetByIdProductUseCase.js";
import { UpdateUserUseCase } from "../../application/users/use-cases/UpdateProductUseCase.js";
import { PrismaUserRepository } from "../../infrastructure/users/repositories/PrismaUserRepository.js";


// Cria uma instância do repositório
const userRepository = new PrismaUserRepository();

// Cria instâncias de Use Cases
export const createUserUseCase = new CreateUserUseCase(userRepository);
export const getAllUsersUseCase = new GetAllUsersUseCase(userRepository);
export const getUserByIdUseCase = new GetUserByIdUseCase(userRepository);
export const updateUserUseCase = new UpdateUserUseCase(userRepository);
export const deleteUserUseCase = new DeleteUserUseCase(userRepository);
export const getUserByEmailUseCase = new GetUserByEmailUseCase(userRepository);