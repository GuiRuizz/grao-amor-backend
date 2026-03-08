import { v4 as uuidv4 } from "uuid";

export class Product {
    public readonly id: string;
    
    constructor(
        
        public name: string,
        public brand: string,
        public pricePerKg: number,
        public stockKg: number,
        id?: string
    ) {
        this.id = id || uuidv4(); // usa o ID passado ou gera um novo
        this.name = name;
        this.brand = brand;
        this.pricePerKg = pricePerKg;
        this.stockKg = stockKg;
    }
    
}