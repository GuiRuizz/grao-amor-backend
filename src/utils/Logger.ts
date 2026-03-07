import chalk from "chalk";

export class Logger {

    private context: string;

    constructor(context: string) {
        this.context = context;
    }

    private static isDev() {
        return process.env.NODE_ENV === "development";
    }

    private format(level: string, color: any, message: string) {

        const time = new Date().toISOString();

        console.log(
            `${color(level)} ${chalk.gray(time)} ${chalk.cyan(`[${this.context}]`)} ${message}`
        );
    }

    info(message: string) {
        if (!Logger.isDev()) return;
        this.format("[INFO]", chalk.blue, message);
    }

    success(message: string) {
        if (!Logger.isDev()) return;
        this.format("[SUCCESS]", chalk.green, message);
    }

    warn(message: string) {
        if (!Logger.isDev()) return;
        this.format("[WARN]", chalk.yellow, message);
    }

    error(message: string, error?: unknown) {
        this.format("[ERROR]", chalk.red, message);

        if (error) {
            console.error(chalk.red(error));
        }
    }
}