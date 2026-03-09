
export interface ProductResponseDTO {
    id: string
    name: string
    brand: string
    pricePerKg: number
    stockKg: number

    category: {
        id: string
        name: string
        description: string
    }
}