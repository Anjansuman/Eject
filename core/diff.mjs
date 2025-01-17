import { getCommitData, getFileContent, getParentFileContent } from './helpers.mjs';
import { diffLines } from 'diff';
import chalk from 'chalk';

// This will show the difference between two versions of a file
export async function displayDiff(objectPath, commitHash) {
    const commitData = JSON.parse(await getCommitData(objectPath, commitHash));

    if (!commitData) {
        console.log(chalk.red("Commit not found."));
        return;
    }

    console.log(chalk.bold("Changes in the last commit are: "));

    // Loop through all files in the commit
    for (const file of commitData.files) {
        console.log(`File: ${file.path}`);
        const fileContent = await getFileContent(objectPath, file.hash);

        // If the commit has a parent, show the diff
        if (commitData.parent) {
            const parentCommitData = JSON.parse(await getCommitData(objectPath, commitData.parent));
            const ParentFileContent = await getParentFileContent(objectPath, parentCommitData, file.path);

            if(ParentFileContent !== undefined) {
                console.log(chalk.bold.blue("\nDiff:"));
                const diff = diffLines(ParentFileContent, fileContent);

                diff.forEach(part => {
                    // Split the value into lines
                    const lines = part.value.split('\n'); 
                
                    // Loop through each line
                    lines.forEach(line => {
                
                        if (part.added) {
                            console.log(chalk.green(`+${line}`)); // Added line
                        } else if (part.removed) {
                            console.log(chalk.red(`-${line}`)); // Removed line
                        } else {
                            console.log(chalk.grey(` ${line}`)); // Unchanged line
                        }
                    });
                });
                console.log();
            } else {
                console.log(chalk.blue("New file in this commit"));
            }
        } else {
            console.log(chalk.blue("First commit"));
        }
    }
}
