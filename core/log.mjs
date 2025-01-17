import fs from 'fs/promises';

import { readFile, getObjectPath, getCurrentHead } from './helpers.mjs';
import chalk from 'chalk';

// This will display the log of commits
export async function displayLog(objectPath, headPath) {
    let currentCommitHash = await getCurrentHead(headPath);

    while (currentCommitHash) {
        // Read the commit data from the objects directory
        const commitPath = getObjectPath(objectPath, currentCommitHash);
        const commitData = JSON.parse(await fs.readFile(commitPath, { encoding: 'utf-8' }));

        // Print commit details
        console.log("__________________________________\n");
        console.log(chalk.bold("Commit: ") + `${chalk.yellow(currentCommitHash)}`);
        console.log(chalk.bold("Date: ") + commitData.timeStamp);
        console.log(chalk.bold("Message: ") + commitData.message);

        // Move to the parent commit
        currentCommitHash = commitData.parent;
    }
}
