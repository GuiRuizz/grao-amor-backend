import { MercadoPagoConfig, Payment } from "mercadopago";
import { Logger } from "../../../utils/Logger.js";

const logger = new Logger("GetAllPaymentsUseCase");

export class GetAllPaymentsUseCase {
    constructor(
        private client: MercadoPagoConfig,
    ) { }

    async execute() {

        const paymentClient = new Payment(this.client);

        const payments = await paymentClient.search({
            options: {
                sort: "date_created",
                criteria: "desc",
                limit: 30,
                offset: 0
            }
        });

        logger.info(`Retrieved ${payments.results?.length ?? 0} payments`);

        return payments.results;
    }
}