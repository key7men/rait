// @CreateTime: 2021/3/3
// @Author: key7men
// @Contact: key7men@gmail.com
// @Last Modified By: key7men
// @Last Modified Time: 11:11 AM
// @Description: rait command line tool

const path = require('path');

const meow = require('meow');
const chalk = require('chalk');
const sub = require('./sub');

const logo = require('./default/logo');

const cli = meow({
    description: chalk.green(logo),
    version: '1.0.0',
    help: `
${chalk.bgBlue('Usage')}
  ${chalk.cyan('> rait <command>')}

${chalk.bgBlue('Commands')}
  ${chalk.cyan('init')}     : ${chalk.gray('create a new blog folder.')}
  ${chalk.cyan('add')}      : ${chalk.gray('add a new article.')}
  ${chalk.cyan('preview')}  : ${chalk.gray('server your blog in localhost.')}
  ${chalk.cyan('gen')}      : ${chalk.gray('generate your site online.')}

${chalk.bgBlue('Examples')}
 ${chalk.cyan('> rait init --dir blogName')}
      ${chalk.gray(': will create a directory blogName and initialize it [alias -d]')}
 ${chalk.cyan('> rait add --name articleName --category tech')}
      ${chalk.gray(': will create a new post which belongs tech-category and named by articleName [alias -n -c]')}
 ${chalk.cyan('> rait preview')}
      ${chalk.gray(': start a server http://localhost:8000')}
 ${chalk.cyan('> rait gen')}
      ${chalk.gray(': generate site online')}
`
}, {
    alias: {
        d: 'dir',
        n: 'name',
        c: 'category'
    }
});

sub(cli.input[0], cli.flags);
module.exports = cli;
