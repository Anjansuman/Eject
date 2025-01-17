import crypto from 'crypto';
import path from 'path';
import fs from 'fs/promises';
import chalk from 'chalk';

// This will hash the file data
export function hashObject(content) {
    // sha-1 is the hashing method
    // utf-8 means the encoding type of content
    // since the sha1 hashing uses hexadecimal, we write digest('hex')
    return crypto.createHash('sha1').update(content, 'utf-8').digest('hex');
}

// This will read a file using UTF-8 encoding
export async function readFile(filePath) {
    return fs.readFile(filePath, { encoding: 'utf-8' });
}

// This will write data to a file
export async function writeFile(filePath, data, options = {}) {
    return fs.writeFile(filePath, data, options);
}

// This will create a directory if it doesn't already exist
export async function createDirectory(dirPath) {
    await fs.mkdir(dirPath, { recursive: true });
}

// This will construct the full path of an object inside .eject/objects
export function getObjectPath(objectPath, fileHash) {
    return path.join(objectPath, fileHash);
}

// This will get the current HEAD commit
export async function getCurrentHead(headPath) {
    try {
        return await fs.readFile(headPath, { encoding: 'utf-8' });
    } catch (error) {
        // Return null if HEAD doesn't exist (no commits yet)
        return null;
    }
}

// Get commit data for a specific commit hash
export async function getCommitData(objectPath, commitHash) {
    const commitPath = path.join(objectPath, commitHash);
    try {
        return await fs.readFile(commitPath, { encoding: 'utf-8' });
    } catch (error) {
        console.log(`Failed to read the commit data: ${chalk.red(error)}`);
        return null;
    }
}

// Get content of a file from its hash
export async function getFileContent(objectPath, fileHash) {
    const objectPath_ = path.join(objectPath, fileHash);
    return fs.readFile(objectPath_, { encoding: 'utf-8' });
}

// Get content of a file from the parent commit
export async function getParentFileContent(objectPath, parentCommitData, filePath) {
    const parentFile = parentCommitData.files.find(file => file.path === filePath);
    if (parentFile) {
        return await getFileContent(objectPath, parentFile.hash);
    }
}