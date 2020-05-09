import os from "os";
import * as nativePath from "path";
import Path from "./path";

export default abstract class SpecialDirectory {
    private static userInfo = os.userInfo();

    public static reloadUserInfo(): void {
        SpecialDirectory.userInfo = os.userInfo();
    }

    public static get userProfile(): Path {
        return new Path(SpecialDirectory.userInfo.homedir);
    }

    public static get homeDrive(): Path {
        return new Path(nativePath.parse(SpecialDirectory.userInfo.homedir).root);
    }
}
