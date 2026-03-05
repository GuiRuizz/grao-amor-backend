import express from "express";
import cors from "cors";
import "dotenv/config";
import productRoutes from "./api/productRoutes.js";
console.log("SERVER INICIADO");
const app = express();
app.use(cors());
app.use(express.json());

app.get("/teste", (req, res) => {
    res.send("Servidor funcionando");
});

// Prefixo /v1 para versionamento da API
 app.use("/v1/products", productRoutes);

app.listen(process.env.PORT || 3001, () => {
    console.log(`Server running on http://localhost:${process.env.PORT || 3001}`);
});