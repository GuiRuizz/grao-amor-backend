import { User } from "../../../domain/users/entities/User.js";
import type { UserResponseDTO } from "./UserDTO.js";

export function toUserResponse(user: User): UserResponseDTO {
    return {
        id: user.id,
        name: user.name,
        email: user.email
    };
}