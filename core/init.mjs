import fs from 'fs/promises';

// This initializes the `.eject` repository
export async function initEject(repoPath, objectPath, remotePath, branchesPath, headPath, indexPath, isEjectInitialized) {
    // Check if the repository is already initialized
    try {
        await fs.access(repoPath);
        if (isEjectInitialized) {
            console.log(chalk.red("eject is already initialized."));
        }
        return; // Exit if already initialized
    } catch (error) {
        // If the directory does not exist, proceed with initialization
        isEjectInitialized = true;
        console.log("Initializing eject");
    }

    try {
        // Create necessary directories
        await fs.mkdir(objectPath, { recursive: true });
        await fs.mkdir(remotePath, { recursive: true }); // Ensure remote folder is created
        await fs.mkdir(branchesPath, { recursive: true }); // Ensure branches folder is created

        // Initialize the HEAD file and the index file if they don't exist
        await fs.writeFile(headPath, '', { flag: 'wx' }); // wx: open file for writing. fails if file exists
        await fs.writeFile(indexPath, JSON.stringify([]), { flag: 'wx' });

        console.log("Repository initialized.");
    } catch (error) {
        console.error("Error:", error.message);
    }
}
