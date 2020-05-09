import yargs from "yargs";
import Command from "./command";
import {TOpt} from "./helpers";

export default class CommandManager {

    private readonly commands: Map<string, Command>;

    private handle: yargs.Argv<{}>;

    public constructor(handle: yargs.Argv<{}>, commands: Map<string, Command> = new Map()) {
        this.handle = handle;
        this.commands = commands;
    }

    public register(command: Command): boolean {
        if (!this.commands.has(command.options.name)) {
            this.commands.set(command.options.name, command);

            let meta: string = command.options.name;

            // Apply meta if specified on the command options.
            if (command.options.options !== undefined && command.options.options !== "") {
                meta += ` ${command.options.options}`;
            }

            // TODO: Support for option(s).
            // Register the command.
            this.handle = this.handle.command(meta, command.options.description, command.prepare, command.run);

            return true;
        }

        return false;
    }

    public find(name: string): TOpt<Command> {
        return this.commands.get(name);
    }

    public getHandle(): yargs.Argv<{}> {
        return this.handle;
    }
}
