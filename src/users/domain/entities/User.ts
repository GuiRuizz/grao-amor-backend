import { v4 as uuidv4 } from "uuid";

export class User {
    public readonly id: string;

    constructor(
        public name: string,
        public email: string,
        public password: string,
        public profilePhoto?: string | null,
        public type: "USER" | "ADMIN" = "USER", // sempre default
        public isActive: boolean = true,
        public createdAt: Date = new Date(),
        public updatedAt: Date = new Date(),
        id?: string
    ) {
        this.id = id ?? uuidv4();
    }
}