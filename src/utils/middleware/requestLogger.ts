import type { Request, Response, NextFunction } from "express";
import chalk from "chalk";

export function requestLogger(req: Request, res: Response, next: NextFunction) {

    const start = Date.now();

    res.on("finish", () => {

        const duration = Date.now() - start;

        const method = req.method;
        const url = req.originalUrl;
        const status = res.statusCode;

        console.log(
            `${chalk.magenta("[API]")} ${chalk.blue(method)} ${url} ${chalk.green(status)} ${chalk.yellow(duration + "ms")}`
        );
    });

    next();
}