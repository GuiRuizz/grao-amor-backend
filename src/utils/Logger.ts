import chalk from "chalk";

export class Logger {

    private static isDev() {
        return process.env.NODE_ENV === "development";
    }

    private static format(
        level: string,
        color: any,
        context: string,
        message: string
    ) {

        const time = new Date().toISOString();

        console.log(
            `${color(level)} ${chalk.gray(time)} ${chalk.cyan(`[${context}]`)} ${message}`
        );
    }

    static info(context: string, message: string) {
        if (!this.isDev()) return;
        this.format("[INFO]", chalk.blue, context, message);
    }

    static success(context: string, message: string) {
        if (!this.isDev()) return;
        this.format("[SUCCESS]", chalk.green, context, message);
    }

    static warn(context: string, message: string) {
        if (!this.isDev()) return;
        this.format("[WARN]", chalk.yellow, context, message);
    }

    static error(context: string, message: string, error?: unknown) {

        // ERRO sempre aparece
        this.format("[ERROR]", chalk.red, context, message);

        if (error) {
            console.error(chalk.red(error));
        }
    }
}