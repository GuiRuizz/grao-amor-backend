import bcrypt from "bcrypt";

import type { IUserRepository } from "../../domain/repositories/IUserRepository.js";
import type { CreateUserDTO } from "../dto/UserDTO.js";
import { AppError } from "../../../utils/AppError.js";
import { Logger } from "../../../utils/Logger.js";
import { User } from "../../domain/entities/User.js";

const logger = new Logger("CreateUserUseCase");
export class CreateUserUseCase {

  constructor(private userRepository: IUserRepository) { }

  async execute(data: CreateUserDTO): Promise<User> {

    const userExists = await this.userRepository.findByEmail(data.email);

    if (userExists) {
      logger.warn(`Attempt to create user with existing email: ${data.email}`);
      throw new AppError("Email já cadastrado.", 409);
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = new User(
      data.name,
      data.email,
      hashedPassword
    );

    await this.userRepository.create(user);

    logger.info(`User with email ${data.email} created successfully`);

    return user;
  }
}