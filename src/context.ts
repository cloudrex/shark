import process from "process";
import os, {UserInfo} from "os";
import chalk from "chalk";
import Path from "./path";
import PathShortner from "./pathShortner";

export default class Context {
    public static readonly userInfo: UserInfo<string> = os.userInfo();

    /**
     * Attempt to change the current active directory.
     * Will return false if the path does not exist,
     * or are otherwise unable to access it.
     */
    public static navigate(toPath: Path): boolean {
        // Ensure path actually exists before continuing.
        if (toPath.exists) {
            const toPathString: string = toPath.toString();

            process.chdir(toPathString);

            /**
             * To ensure we've changed the working directory, compare
             * the actual current directory to our inteded target
             * directory.
             */
            return process.cwd() == toPathString;
        }

        // Path does not exist, process should fail immediately.
        return false;
    }

    public static getWorkingDirectory(): Path {
        return new Path(process.cwd());
    }

    public static getPrompt(): string {
        const workingDirectoryString: string = PathShortner.shortenCommonEntities(Context.getWorkingDirectory()).toString();

        // TODO: Need to resolve whether the user is an admin or not.
        const separationSymbol: string = false ? "$" : ">";

        return ` ${chalk.gray(workingDirectoryString)} ${chalk.blueBright(Context.userInfo.username)} ${separationSymbol} `;
    }
}
