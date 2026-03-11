import { MercadoPagoConfig, Payment } from "mercadopago";

export class GetPaymentProviderUseCase {

    constructor(private client: MercadoPagoConfig) {}

    async execute(providerPaymentId: string) {

        const paymentClient = new Payment(this.client);

        const payment = await paymentClient.get({
            id: Number(providerPaymentId)
        });

        return payment;
    }
}