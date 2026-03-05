import type { IProductRepository } from "../../../domain/products/repositories/IProductRepository.js"


export class GetAllProductsUseCase {

    constructor(private repository: IProductRepository) { }

    async execute() {
        return await this.repository.findAll()
    }
}
