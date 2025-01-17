import fs from 'fs/promises';
import chalk from 'chalk';

import { hashObject, getObjectPath, getCurrentHead } from './helpers.mjs';


// This is for committing with a message
export async function createCommit(objectPath, headPath, indexPath, message) {
    // Read the staging area (index file)
    const index = JSON.parse(await fs.readFile(indexPath, { encoding: 'utf-8' }));

    // Get the current HEAD commit
    const parentCommit = await getCurrentHead(headPath);

    // Store commit data like timestamp, message, and parent commit
    const commitData = {
        timeStamp: new Date().toISOString(),
        message,
        files: index,
        parent: parentCommit,
    };

    // Create a hash for the commit
    const commitHash = hashObject(JSON.stringify(commitData));

    // Path for the commit object
    const commitPath = getObjectPath(objectPath, commitHash);

    // Write the commit data into the file
    await fs.writeFile(commitPath, JSON.stringify(commitData));

    // Update the HEAD to point to the new commit
    await fs.writeFile(headPath, commitHash);

    // Clear the staging area
    await fs.writeFile(indexPath, JSON.stringify([]));

    console.log(`Commit created successfully: ${chalk.yellow(commitHash)}`);
}


