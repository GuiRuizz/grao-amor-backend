import bcrypt from "bcrypt";
import { User } from "../../../domain/users/entities/User.js";
import type { IUserRepository } from "../../../domain/users/repositories/IUserRepository.js";
import type { CreateUserDTO } from "../dto/UserDTO.js";
import { AppError } from "../../../utils/AppError.js";


export class CreateUserUseCase {

  constructor(private userRepository: IUserRepository) { }

  async execute(data: CreateUserDTO): Promise<User> {

    const userExists = await this.userRepository.findByEmail(data.email);

    if (userExists) {
      throw new AppError("Email já cadastrado.", 409);
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = new User(
      data.name,
      data.email,
      hashedPassword
    );

    await this.userRepository.create(user);

    return user;
  }
}