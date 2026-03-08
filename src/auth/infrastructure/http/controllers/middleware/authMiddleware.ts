import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../../../../../utils/AppError.js";
import { Logger } from "../../../../../utils/Logger.js";

const logger = new Logger("AuthMiddleware");
export function authMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) throw new AppError("Authorization header missing", 401);

        const [bearer, token] = authHeader.split(" ");
        if (bearer !== "Bearer" || !token) throw new AppError("Invalid authorization header", 401);

        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string; role: string };
        req.userId = decoded.userId;
        req.userRole = decoded.role;
        next();
    } catch {
        next(new AppError("Unauthorized", 401));
    }
}

// Middleware de autorização por role
export function roleMiddleware(allowedRoles: string[]) {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!req.userRole || !allowedRoles.includes(req.userRole)) {
            logger.warn(`User ${req.userId} attempted to access restricted resource`);
            return next(new AppError("Forbidden: insufficient permissions", 403));
        }
        logger.info(`User ${req.userId} accessed restricted resource`);
        next();
    };
}