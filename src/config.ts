import fs from "fs";
import nativePath from "path";
import Path from "./path";
import {FilesystemSignal, TSignalType} from "./helpers";

export default abstract class Config {
    /**
     * The name of the configuration file.
     */
    public static readonly fileName: string = ".shark";

    public static initSync(path: Path): TSignalType {
        if (path.exists) {
            return FilesystemSignal.PathExists;
        }

        const configFilePath: string = nativePath.join(path.toString(), Config.fileName);

        fs.writeFileSync(configFilePath, JSON.stringify({
            name: path.toNativePath().name,
            initializedTimestamp: Date.now()
        }));

        return fs.existsSync(configFilePath);
    }
}
