import express from "express";
import cors from "cors";
import "dotenv/config";
import productRoutes from "./api/productRoutes.js";
import userRoutes from "./api/userRoutes.js";
import { Logger } from "./utils/Logger.js";
import { errorHandler } from "./utils/middleware/errorHandler.js";
import { requestLogger } from "./utils/middleware/requestLogger.js";
import authRoutes from "./api/authRoutes.js";
import categoryRoutes from "./api/categoryRoutes.js";
import cartRoutes from "./api/cartRoutes.js";
import orderRoutes from "./api/orderRoutes.js";
import paymentRoutes from "./api/paymentRoutes.js";

const app = express();
const logger = new Logger("Server");
app.use(cors());
app.use(express.json());

app.get("/teste", (req, res) => {
    res.send("Servidor funcionando");
});
app.use(requestLogger);
// Prefixo /v1 para versionamento da API

app.use("/v1/products", productRoutes);

app.use("/v1/payments", paymentRoutes);

app.use("/v1/categories", categoryRoutes);

app.use("/v1/categories", categoryRoutes);

app.use("/v1/orders", orderRoutes);

app.use("/v1/cart", cartRoutes);

app.use("/v1/users", userRoutes);

app.use("/v1/auth", authRoutes);

app.use(errorHandler);

app.listen(process.env.PORT || 3001, () => {
    logger.info(`Server running on http://localhost:${process.env.PORT || 3001}`);
});