// @CreateTime: 2021/3/3
// @Author: key7men
// @Contact: key7men@gmail.com
// @Last Modified By: key7men
// @Last Modified Time: 11:50 AM
// @Description: initialize a new blog

const path = require('path');
const spawn = require('child_process').spawn;
const copyFn = require('copy-concurrently');
const chalk = require('chalk');

const THEME = path.join(__dirname, '../../theme');

module.exports = function(blogName) {
    let dirName = blogName || 'raitBlog';
    let target = path.resolve(process.cwd(), dirName);

    console.info('initializing a new blog ...');
    copyFn(THEME, target).then(() => {
        process.chdir(target);
        console.info(`${chalk.grey('you need go to the root directory of your blog, and exec')} ${chalk.green('npm install')}`);
    }).catch(err => {
        console.error(`${chalk.bgRed('error')} : err`);
        console.error(chalk.bgRed('initialing failed'));
    })
}
