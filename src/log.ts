import chalk from "chalk";

export default abstract class Log {
    public static compose(message: string, color: any): void {
        console.log(" " + color(message));
    }

    public static error(message: string): void {
        Log.compose(message, chalk.red);
    }

    public static success(message: string): void {
        Log.compose(message, chalk.green);
    }

    public static info(message: string): void {
        Log.compose(message, chalk.blueBright);
    }

    public static verbose(message: string): void {
        Log.compose(message, chalk.gray);
    }
}
