import Context from "./context";

export interface ICommandOptions {
    readonly name: string;

    readonly requireAdmin?: boolean;
}

export default abstract class Command {
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

    public abstract async run(): Promise<boolean>;
}
