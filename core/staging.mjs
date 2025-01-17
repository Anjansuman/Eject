import { readFile, writeFile } from './helpers.mjs';

// This is for staging a file for committing
export async function updateStagingArea(indexPath, filePath, fileHash) {
    // Read the index file
    const index = JSON.parse(await readFile(indexPath));

    // Add the file to the index
    index.push({ path: filePath, hash: fileHash });

    // Write the updated index file
    await writeFile(indexPath, JSON.stringify(index));
}
