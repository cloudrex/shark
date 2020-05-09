import {Signal, TOptAsyncOr, TSignal} from "./helpers";
import yargs from "yargs";

export interface ICommandOptions {
    readonly name: string;

    readonly options?: string;

    readonly description: string;

    readonly requireAdmin?: boolean;
}

export default abstract class Command<T = any> {
    public static get defaultCommandOptions(): Partial<ICommandOptions> {
        return {
            requireAdmin: false
        };
    }

    public readonly options: ICommandOptions;

    constructor(options: ICommandOptions) {
        this.options = {
            ...Command.defaultCommandOptions,
            ...options
        };
    }

    public prepare(args: yargs.Argv<{}>): void {
        //
    }

    public abstract run(argv: T): TOptAsyncOr<TSignal>;
}
