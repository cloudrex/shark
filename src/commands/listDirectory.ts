import Command from "../command";
import Context from "../context";
import fs, {stat} from "fs";
import Log, {TLogger} from "../log";
import chalk from "chalk";

// TODO: Add path option and default to current directory.
export default class $ListDirectory extends Command {
    public constructor() {
        super({
            name: "ls",
            description: "List files and folders located under the current working directory."
        });
    }

    public async run(): Promise<boolean> {
        // TODO: Display paths in order by whether they're directories or files.
        const paths: string[] = fs.readdirSync(Context.getWorkingDirectory().toString());

        for (const path of paths) {
            const stats: fs.Stats = fs.lstatSync(path);

            let color: chalk.Chalk = chalk.gray;

            if (stats.isDirectory()) {
                color = chalk.white;
            }

            Log.compose(path, color);
        }

        return true;

    }
}
