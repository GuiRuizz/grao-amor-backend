import { Logger } from "../Logger.js";


export function createLogger(context?: string): Logger {
    // Se context não for passado, tenta descobrir pelo nome da classe chamando
    if (!context) {
        // Pega o nome da classe que chamou o logger
        const err = new Error();
        const stack = err.stack?.split("\n")[2]; // pega a linha do chamador
        const classNameMatch = stack?.match(/at (\w+)/);
        context = classNameMatch ? classNameMatch[1] : "Unknown";
    }
    return new Logger(context as string);
}