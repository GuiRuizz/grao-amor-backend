import type { IPaymentsRepository } from "../../domain/repositories/IPaymentRepository.js";


export class GetPaymentByProviderIdUseCase {

    constructor(private paymentRepository: IPaymentsRepository) {}

    async execute(providerRef: string) {

        const payment = await this.paymentRepository.findByProviderRef(providerRef);

        return payment;
    }
}