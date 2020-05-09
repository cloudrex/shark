import Path from "./path";
import SpecialDirectory from "./specialDirectory";

export default abstract class PathShortner {
    public static findAndReplace(find: string, replace: string, subject: string): string {
        if (find == replace) {
            throw new Error("Cannot find and replace the same string");
        }

        while (subject.includes(find)) {
            subject = subject.replace(find, replace);
        }

        return subject;
    }

    public static shortenUserProfile(path: Path): Path {
        const userProfilePathString: string = SpecialDirectory.userProfile.toString();

        return new Path(PathShortner.findAndReplace(userProfilePathString, "~", path.toString()));
    }

    public static shortenMainDrive(path: Path): Path {
        const homeDrive: string = SpecialDirectory.homeDrive.toString();

        return new Path(PathShortner.findAndReplace(homeDrive, "/", path.toString()));
    }

    public static shortenCommonEntities(path: Path): Path {
        // User profile must be shortened first.
        path = PathShortner.shortenUserProfile(path);

        path = PathShortner.shortenMainDrive(path);

        return path;
    }
}
