import fs from "fs";
import path, {ParsedPath} from "path";

export default class Path {
    private readonly pathString: string;

    public constructor(pathString: string) {
        this.pathString = pathString;
    }

    public get exists(): boolean {
        return fs.existsSync(this.pathString);
    }

    public toString(): string {
        return this.pathString;
    }

    public toNativePath(): ParsedPath {
        return path.parse(this.pathString);
    }
}
