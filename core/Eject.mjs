import path from 'path';
import fs from 'fs/promises';
import chalk from 'chalk';

import { initEject } from './init.mjs';
import { createCommit } from './commit.mjs';
import { displayLog } from './log.mjs';
import { displayDiff } from './diff.mjs';

import { hashObject } from './helpers.mjs';
import { updateStagingArea } from './staging.mjs';

export class Eject {
    constructor(repoPath = '.') {
        this.repoPath = path.join(repoPath, '.eject');
        this.objectPath = path.join(this.repoPath, 'objects'); // .eject/objects
        this.headPath = path.join(this.repoPath, 'HEAD'); // .eject/HEAD
        this.indexPath = path.join(this.repoPath, 'index'); // .eject/index
        this.remotePath = path.join(this.repoPath, 'remote'); // .eject/remote
        this.branchesPath = path.join(this.repoPath, 'branches'); // .eject/branches
        this.isEjectInitialized = false;
        this.init();
    }

    async init() {
        await initEject(this.repoPath, this.objectPath, this.remotePath, this.branchesPath, this.headPath, this.indexPath);
    }

    async add(fileToBeAdded) {
        const fileData = await fs.readFile(fileToBeAdded, { encoding: 'utf-8' });
        const fileHash = hashObject(fileData);

        console.log(chalk.yellow(fileHash));

        const newFileHashedObjectPath = path.join(this.objectPath, fileHash);
        await fs.writeFile(newFileHashedObjectPath, fileData);

        await updateStagingArea(this.indexPath, fileToBeAdded, fileHash);

        console.log(`Added ${chalk.bgMagenta(fileToBeAdded)}`);
    }

    async commit(message) {
        await createCommit(this.objectPath, this.headPath, this.indexPath, message);
    }

    async log() {
        await displayLog(this.objectPath, this.headPath);
    }

    async show(commitHash) {
        await displayDiff(this.objectPath, commitHash);
    }
}
