import Command from "../command";
import Context from "../context";
import Path from "../path";

export default class $ChangeDirectory extends Command {
    public constructor() {
        super({
            name: "cd"
        });
    }

    public async run(args: string[]): Promise<boolean> {
        const workingDirectory: Path = Context.getWorkingDirectory();

        return Context.navigate(args[0]);
    }
}
