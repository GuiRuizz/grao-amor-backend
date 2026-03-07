import type { Request, Response, NextFunction } from "express";
import { AppError } from "../AppError.js";
import { Logger } from "../Logger.js";


export function errorHandler(
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
) {
    const logger = new Logger("ErrorHandler");

    if (error instanceof AppError) {

        logger.warn(error.message);

        return res.status(error.statusCode).json({
            error: error.message
        });
    }

    logger.error(error.message, { stack: error.stack });

    return res.status(500).json({
        error: "Internal server error"
    });
}