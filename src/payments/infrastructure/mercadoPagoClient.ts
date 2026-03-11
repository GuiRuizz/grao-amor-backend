import { MercadoPagoConfig, Order } from "mercadopago";
import { Logger } from "../../utils/Logger.js";

const key = process.env.TEST_ACCESS_TOKEN || "";
const client = new MercadoPagoConfig({
    accessToken: key,
    options: { timeout: 5000 },
});

const logger = new Logger("MercadoPagoClient");
logger.info("MercadoPago client initialized successfully");
export default client;