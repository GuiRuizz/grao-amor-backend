import type { Request, Response } from "express"
import type { CreateUserUseCase } from "../../../../application/users/use-cases/CreateUserUseCase.js"
import type { DeleteUserUseCase } from "../../../../application/users/use-cases/DeleteProductUseCase.js"
import type { GetAllUsersUseCase } from "../../../../application/users/use-cases/GetAllProductsUseCase.js"
import type { GetUserByIdUseCase } from "../../../../application/users/use-cases/GetByIdProductUseCase.js"
import type { UpdateUserUseCase } from "../../../../application/users/use-cases/UpdateProductUseCase.js"
import { toUserResponse } from "../../../../application/users/dto/MapperUser.js"
import { AppError } from "../../../../utils/AppError.js"


export class UserController {

    constructor(
        private createUserUseCase: CreateUserUseCase,
        private getAllUsersUseCase: GetAllUsersUseCase,
        private getUserByIdUseCase: GetUserByIdUseCase,
        private updateUserUseCase: UpdateUserUseCase,
        private deleteUserUseCase: DeleteUserUseCase
    ) { }

    async create(req: Request, res: Response) {
        try {

            const { name, email, password } = req.body;

            const user = await this.createUserUseCase.execute({
                name,
                email,
                password
            });

            return res.status(201).json(toUserResponse(user));

        } catch (error) {
            if (error instanceof AppError) {
                return res.status(error.statusCode).json({
                    error: error.message
                });
            }
            console.error(error);
            return res.status(500).json({ error: "Internal error" });
        }
    }

    async getAll(req: Request, res: Response) {
        try {
            const users = await this.getAllUsersUseCase.execute()
            res.status(200).json(users)
        } catch (error) {
            res.status(500).json({ error: "Internal error" })
        }
    }

    async getById(req: Request, res: Response) {
        try {
            const id = req.params.id;

            if (!id || Array.isArray(id)) {
                return res.status(400).json({ message: "ID inválido" });
            }

            const user = await this.getUserByIdUseCase.execute(id);

            if (!user) {
                return res.status(404).json({ message: "Usuário não encontrado." });
            }

            return res.json(user);
        } catch (error: any) {
            return res.status(400).json({ message: error.message });
        }
    }

    async update(req: Request, res: Response) {
        try {
            const id = req.params.id;

            if (!id || Array.isArray(id)) {
                return res.status(400).json({ message: "ID inválido" });
            }

            const data = req.body; // { name, price, description ... }

            const updatedUser = await this.updateUserUseCase.execute(id, data);

            return res.json({ message: "Usuário atualizado com sucesso", user: updatedUser });

        } catch (error: any) {
            return res.status(400).json({ message: error.message });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const id = req.params.id;

            if (!id || Array.isArray(id)) {
                return res.status(400).json({ message: "ID inválido" });
            }

            await this.deleteUserUseCase.execute(id);

            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: "Internal error" });
        }

    }
}