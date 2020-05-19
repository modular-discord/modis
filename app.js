/** setup */
require('clear')();
require('submodule');
require('dotenv').config();

/** variables */
const clear = require('clear');
const chalk = require('chalk');
const readline = require('readline');
const discord = require('discord.js');

/** cli templates */
const HEADER = chalk.grey(`${chalk.bold("modis")} ${chalk.green("active")} process_id:${process.pid} type '${chalk.bold('help')}' to see more commands`);
console.log(HEADER);

/** services */
const client = require('./services/parse.js')(new discord.Client());
const build = require('./services/build.js');
const tools = require('./services/tools.js');

const tempData = { modules: ["uptime"] } //require('./tempData.json'); /* !!! FOR TESTING. MOVE TO MONGODB !!! */

/** require submodules */
tools.require_submodules(__dirname, tempData, build);

/** cli helper */
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.on('line', (input) => {
    clear();
    console.log(HEADER);

    if (input === 'help') help();
    if (input === 'list') available_submodules();
});

/* cli functions */
function help() { console.log(`
${chalk.bold(`list`)} ${chalk.grey(`show loaded submodules`)}
`) };

function available_submodules() {
    let res = '\n';
    for (let s in tools.available_submodules) { res += chalk.grey(`  ${tools.available_submodules[s]}\n`) };
    console.log(res);
};
