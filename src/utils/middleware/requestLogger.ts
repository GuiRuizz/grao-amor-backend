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
            `${chalk.magenta("[API]")} ${chalk.blue(method)} ${url} ${colorStatus(status)} ${chalk.yellow(duration + "ms")}`
        );
    });

    next();
}

function colorStatus(status: number) {
    if (status >= 500) return chalk.red(status);
    if (status >= 400) return chalk.yellow(status);
    if (status >= 300) return chalk.cyan(status);
    if (status >= 200) return chalk.green(status);
    return chalk.green(status);
}