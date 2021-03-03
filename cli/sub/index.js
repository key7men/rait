// @CreateTime: 2021/3/3
// @Author: key7men
// @Contact: key7men@gmail.com
// @Last Modified By: key7men
// @Last Modified Time: 11:55 AM
// @Description: index

const chalk = require('chalk')
const path = require('path');
const init = require('./init');
const add = require('./add');
const preview = require('./preview');
const gen = require('./gen');

module.exports = function(subcommand, args) {
    let len = Object.keys(args).length;
    switch (subcommand) {
        case 'init':
            if (len === 0 || len === 2) {
                init(args.dir);
            } else {
                console.error(`
${chalk.green('rait init')} ${chalk.gray('just accept 1 arguments')}
  ${chalk.gray('--dir (alias -a) means your blog path')}
${chalk.bgBlue('example')}:
  ${chalk.gray('rait init -d test')}`
                )
            }
            break;
        case 'add':
            if (len === 2 || len === 4) {
                add(args.name, args.category);
            } else {
                console.error(
                    `
${chalk.green('rait add')} ${chalk.gray('just accept 1 or 2 arguments')}
  ${chalk.gray('--name (alias -n) means your article name')}
  ${chalk.gray('--category (alias -n) means how to classify your new article')})
${chalk.bgBlue('example')}:
  ${chalk.gray('rait add -n test')}
  ${chalk.gray('rait add -c life')}
  ${chalk.gray('rait add -n test -c life')}`
                )
            }
            break;
        case 'preview':
            if (len === 0) {
                preview();
            } else {
                console.error(
                    `
${chalk.green('rait preview')} ${chalk.gray('can not accept any arguments')}
${chalk.bgBlue('example')}:
  ${chalk.gray('rait preview')}`
                )
            }
            break;
        case 'gen':
            if (len === 0) {
                gen();
            } else {
                console.error(`
${chalk.green('rait gen')} ${chalk.gray('can not accept any arguments')}
${chalk.bgBlue('example')}:
  ${chalk.gray('rait gen')}`
                )
            }
            break;
        default:
            console.error(`
${chalk.gray('> can not resolve your commands, please check')} ${chalk.green('rait --help')}`);
            break;
    }
}
