import type { Request, Response, NextFunction } from "express";
import { AppError } from "../AppError.js";
import { Logger } from "../Logger.js";


export function errorHandler(
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
) {

    if (error instanceof AppError) {

        Logger.warn("ErrorHandler", error.message);

        return res.status(error.statusCode).json({
            error: error.message
        });
    }

    Logger.error("ErrorHandler", error.message, { stack: error.stack });

    return res.status(500).json({
        error: "Internal server error"
    });
}