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
const API_PREFIX = process.env.API_PREFIX;

app.use(cors());
app.use(express.json());

app.get("/teste", (req, res) => {
    res.send("Servidor funcionando"); 
});
app.use(requestLogger);
// Prefixo /v1 para versionamento da API

app.use(`${API_PREFIX}products`, productRoutes);

app.use(`${API_PREFIX}payments`, paymentRoutes);

app.use(`${API_PREFIX}uploads`, express.static("public/uploads"));

app.use(`${API_PREFIX}categories`, categoryRoutes);

app.use(`${API_PREFIX}orders`, orderRoutes);

app.use(`${API_PREFIX}cart`, cartRoutes);

app.use(`${API_PREFIX}users`, userRoutes);

app.use(`${API_PREFIX}auth`, authRoutes);

app.use(errorHandler);

app.listen(process.env.PORT || 3001, () => {
    logger.info(`Server running on http://localhost:${process.env.PORT || 3001}`);
});