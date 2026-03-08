import type { Request, Response } from "express"
import type { CreateUserUseCase } from "../../../../users/application/use-cases/CreateUserUseCase.js"
import type { DeleteUserUseCase } from "../../../application/use-cases/DeleteUserUseCase.js"
import type { GetAllUsersUseCase } from "../../../application/use-cases/GetAllUsersUseCase.js"
import type { GetUserByIdUseCase } from "../../../application/use-cases/GetByIdUserUseCase.js"
import type { UpdateUserUseCase } from "../../../application/use-cases/UpdateUserUseCase.js"

import { Logger } from "../../../../utils/Logger.js"
import { toUserResponse } from "../../../application/dto/MapperUser.js"
import type { GetUserByEmailUseCase } from "../../../application/use-cases/GetByEmailUserUseCase.js"
const logger = new Logger("UserController");
export class UserController {

    constructor(
        private createUserUseCase: CreateUserUseCase,
        private getAllUsersUseCase: GetAllUsersUseCase,
        private getUserByIdUseCase: GetUserByIdUseCase,
        private updateUserUseCase: UpdateUserUseCase,
        private deleteUserUseCase: DeleteUserUseCase,
        private getUserByEmailUseCase: GetUserByEmailUseCase
    ) {
    }

    async create(req: Request, res: Response) {


        const { name, email, password } = req.body;

        const user = await this.createUserUseCase.execute({
            name,
            email,
            password
        });

        logger.info(`User with email ${email} created successfully`);

        return res.status(201).json(toUserResponse(user));

    }

    async getAll(req: Request, res: Response) {

        const users = await this.getAllUsersUseCase.execute()
        logger.info(`Retrieved ${users.length} users successfully`);
        res.status(200).json(users.map(toUserResponse))

    }

    async getById(req: Request, res: Response) {

        const id = req.params.id;

        if (!id || Array.isArray(id)) {
            logger.warn("Invalid ID provided");
            return res.status(400).json({ message: "ID inválido" });
        }

        const user = await this.getUserByIdUseCase.execute(id);

        if (!user) {
            logger.info(`User with ID ${id} not found`);
            return res.status(404).json({ message: "Usuário não encontrado." });
        }

        logger.info(`User with ID ${id} retrieved successfully`);
        return res.json(toUserResponse(user));

    }

    async update(req: Request, res: Response) {

        const id = req.params.id;

        if (!id || Array.isArray(id)) {
            logger.warn("Invalid ID provided");
            return res.status(400).json({ message: "ID inválido" });
        }

        const data = req.body; // { name, price, description ... }

        const updatedUser = await this.updateUserUseCase.execute(id, data);

        logger.info(`User with ID ${id} updated successfully`);
        return res.json({ message: "Usuário atualizado com sucesso", user: toUserResponse(updatedUser!) });


    }

    async delete(req: Request, res: Response) {

        const id = req.params.id;

        if (!id || Array.isArray(id)) {
            logger.warn("Invalid ID provided");
            return res.status(400).json({ message: "ID inválido" });
        }

        await this.deleteUserUseCase.execute(id);
        logger.info(`User with ID ${id} deleted successfully`);

        res.status(204).send();

    }

    async getByEmail(req: Request, res: Response) {

        const email = req.params.email;
        if (!email || Array.isArray(email)) {
            logger.warn("Invalid email provided");
            return res.status(400).json({ message: "Email inválido" });
        }
        const user = await this.getUserByEmailUseCase.execute(email);

        if (!user) {
            logger.info(`User with email ${email} not found`);
            return res.status(404).json({ message: "Usuário não encontrado." });
        }
        logger.info(`User with email ${email} retrieved successfully`);
        return res.json(toUserResponse(user));
    }
}