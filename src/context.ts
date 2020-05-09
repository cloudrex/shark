import process from "process";
import Path from "./path";

export default class Context {
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
}
