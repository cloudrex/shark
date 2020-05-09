import fs from "fs";

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
}
