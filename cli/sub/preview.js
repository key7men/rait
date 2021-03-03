// @CreateTime: 2021/3/3
// @Author: key7men
// @Contact: key7men@gmail.com
// @Last Modified By: key7men
// @Last Modified Time: 11:53 AM
// @Description: preview blog on browser

const fs = require('fs');
const path = require('path');
const pkgConf = require('pkg-conf');
const exec = require('child_process').exec;
const chalk = require('chalk');

module.exports = function() {
    if (fs.existsSync(path.resolve(process.cwd(), 'package.json'))) {
        if (!!pkgConf.sync('status').init) {
            exec(`${process.cwd()}/node_modules/.bin/gulp server`, (err) => {
                console.error(err)
            });
        } else {
            console.error(`${chalk.bgRed('error')} : please go to the root directory of your blog and try again!`);
            process.exit(2);
        }
    } else {
        console.error(`${chalk.bgRed('error')} : please go to the root directory of your blog and try again!`);
        process.exit(2);
    }
}
