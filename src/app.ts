import readline from "readline";
import os, {UserInfo} from "os";
import {execSync} from "child_process";
import chalk from "chalk";
import Context from "./context";
import SpecialDirectory from "./specialDirectory";
import PathShortner from "./pathShortner";

Context.navigate(SpecialDirectory.userProfile);
Context.getWorkingDirectory();

const commandInterface: readline.Interface = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const userInfo: UserInfo<string> = os.userInfo();
const workingDirectoryString: string = PathShortner.shortenCommonEntities(Context.getWorkingDirectory()).toString();

commandInterface.setPrompt(`${chalk.gray(workingDirectoryString)} ${chalk.blueBright(userInfo.username)} > `);
commandInterface.prompt();

commandInterface.on("line", (input: string) => {
    if (input.startsWith("$") && input.length > 1) {
        const command: string = input.substr(1);

        if (command === "q") {
            commandInterface.close();
            process.exit(0);
        }
        else {
            console.log("Unsupported internal command");
        }
    }
    else {
        try {
            execSync(input, {
                stdio: "inherit"
            });
        }
        catch (error) {
            console.log(`Command failed: ${error.message}`);
        }
    }

    commandInterface.prompt();
});
