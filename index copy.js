#!/usr/bin/env node

import { Command } from 'commander';
import { init } from './commands/init.mjs';
import { add } from './commands/add.mjs';
import { commit } from './commands/commit.mjs';
import { log } from './commands/log.mjs';
import { show } from './commands/show.mjs';

const program = new Command();

program.command('init').action(init);
program.command('add <file>').action(add);
program.command('commit <message>').action(commit);
program.command('log').action(log);
program.command('show <commitHash>').action(show);

program.parse(process.argv);
