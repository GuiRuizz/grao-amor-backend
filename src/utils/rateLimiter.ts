import rateLimit from "express-rate-limit";

export const limiter = rateLimit({
    message: "Excedeu o número de requisições",
    windowMs: 15 * 60 * 1000,
    max: 100
});