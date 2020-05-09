#!/usr/bin/env node

import {execSync} from "child_process";
import readline from "readline";
import yargs from "yargs";
import Context from "./context";
import SpecialDirectory from "./specialDirectory";
import CommandManager from "./commandManager";
import $ChangeDirectory from "./commands/changeDirectory";
import $ListDirectory from "./commands/listDirectory";
import $Initialize from "./commands/initialize";
import Log from "./log";

Context.navigate(SpecialDirectory.userProfile);
Context.getWorkingDirectory();

// Create a YArgs instance to be used as the main handle.
const yargsHandle: yargs.Argv<{}> = yargs;

// Configure the handle.
yargsHandle.exitProcess(false);

// Prepare command manager.
const commandManager: CommandManager = new CommandManager(yargsHandle);

// Register commands.
commandManager.register(new $ChangeDirectory());
commandManager.register(new $ListDirectory());
commandManager.register(new $Initialize());

const commandInterface: readline.Interface = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const drawPrompt = () => {
    // Prepare & draw prompt.
    commandInterface.setPrompt(Context.getPrompt());
    commandInterface.prompt();
};

commandInterface.on("line", (input: string) => {
    const isNative: boolean = input.length > 1 && input[0] == "#";

    if (!isNative) {
        // Attempt to parse possible command from input string.
        yargsHandle.parse(input);
    }
    else {
        try {
            execSync(input.substr(1), {
                cwd: Context.getWorkingDirectory().toString(),
                stdio: "inherit"
            });
        }
        catch (error) {
            Log.error(`Command failed to execute: ${error.message}`)
        }
    }

    drawPrompt();
});

// Draw initial prompt.
drawPrompt();
