import Command from "../command";
import Context from "../context";
import Path from "../path";
import Config from "../config";
import {TSignalType} from "../helpers";

export default class $Initialize extends Command {
    public constructor() {
        super({
            name: "init",
            description: "Initialize a configuration file on the current working directory."
        });
    }

    public run(): TSignalType {
        const workingDirectory: Path = Context.getWorkingDirectory();

        return Config.initSync(workingDirectory);
    }
}
