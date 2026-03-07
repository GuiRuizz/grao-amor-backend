import bcrypt from "bcrypt";
import { User } from "../../../domain/users/entities/User.js";
import type { IUserRepository } from "../../../domain/users/repositories/IUserRepository.js";
import type { CreateUserDTO } from "../dto/UserDTO.js";
import { AppError } from "../../../utils/AppError.js";
import type { Logger } from "../../../utils/Logger.js";


export class CreateUserUseCase {

  constructor(private userRepository: IUserRepository, private logger: Logger) { }

  async execute(data: CreateUserDTO): Promise<User> {

    const userExists = await this.userRepository.findByEmail(data.email);

    if (userExists) {
      this.logger.warn(`Attempt to create user with existing email: ${data.email}`);
      throw new AppError("Email já cadastrado.", 409);
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = new User(
      data.name,
      data.email,
      hashedPassword
    );

    await this.userRepository.create(user);

    this.logger.info(`User with email ${data.email} created successfully`);

    return user;
  }
}