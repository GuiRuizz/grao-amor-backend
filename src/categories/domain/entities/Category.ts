import { v4 as uuidv4 } from "uuid";

export class Category {
    public readonly id: string;
    
    constructor(
        
        public name: string,
        public description: string,
        id?: string
    ) {
        this.id = id || uuidv4(); // usa o ID passado ou gera um novo
        this.name = name;
        this.description = description;
    }
    
}