import Command from "../command";
import Context from "../context";
import Path from "../path";

type Args = {
    readonly path: string;
};

export default class $ChangeDirectory extends Command<Args> {
    public constructor() {
        super({
            name: "cd",
            options: "[path]",
            description: "Change the process' working directory."
        });
    }

    public async run(argv: Args): Promise<boolean> {
        return Context.navigate(new Path(argv.path));
    }
}
