
const fs = require('fs');
const chalk = require('chalk');

exports.available_submodules = [];

exports.require_submodules = (dirname, tempData, build) => {
  fs.readdirSync(`${dirname}/submodules`).forEach(file => {
    if ( fs.statSync(`${dirname}/submodules/${file}`).isDirectory() ) {
      /** required env variable for module to work */
      let variables = require(`${dirname}/submodules/${file}/package.json`).environment_variables,
          load_module = true;

      /** if undefined, dont load */
      if (variables === undefined) {
        console.log(chalk.red(`warning:`)+chalk.grey(` ${file} module missing 'environment_variables' in package.json`));
        load_module = false;
      };

      /** if missing var in process.env, dont load */
      for (let c in variables) {
        let active = false;
        for (let v in process.env) active = (variables[c] === v);

        if (!active) {
          console.log(chalk.red(`skipping ${file} module:`)+chalk.grey(` missing .env variable ${variables[c]}`));
          load_module = false;
        };
      };

      /** if module "turned on" */
      if (tempData.modules.indexOf(file) > -1) {
        /** load submodule */
        if (load_module) {require(`${dirname}/submodules/${file}`)(build); exports.available_submodules.push(file)};
      };
    };
  });
};
