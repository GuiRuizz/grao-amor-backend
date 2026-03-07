import express from "express";
import cors from "cors";
import "dotenv/config";
import productRoutes from "./api/productRoutes.js";
import userRoutes from "./api/userRoutes.js";
import { Logger } from "./utils/Logger.js";
import { errorHandler } from "./utils/middleware/errorHandler.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/teste", (req, res) => {
    res.send("Servidor funcionando");
});

// Prefixo /v1 para versionamento da API
app.use("/v1/products", productRoutes);

app.use("/v1/users", userRoutes);

app.use(errorHandler);

app.listen(process.env.PORT || 3001, () => {
    Logger.info("ServerStart", `Server running on http://localhost:${process.env.PORT || 3001}`);
});