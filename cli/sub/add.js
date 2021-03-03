// @CreateTime: 2021/3/3
// @Author: key7men
// @Contact: key7men@gmail.com
// @Last Modified By: key7men
// @Last Modified Time: 11:23 AM
// @Description: add a new post

const fs = require('fs');
const path = require('path');

const nconf = require('nconf');
const chalk = require('chalk');
const copyFn = require('copy-concurrently');
const shell = require('shelljs');

const sample = path.join(__dirname, '../default/sample.md');

module.exports = function(article, category) {
    if (!fs.existsSync(path.resolve(process.cwd(), 'config.json'))) {
        console.error(`${chalk.bgRed('error')}: Can not find config.json file in current directory`)
        process.exit(2);
    }

    nconf.env().argv().file('conf', path.resolve(process.cwd(), 'config.json'));

    let defaultName = nconf.get('default').articleName;
    let defaultCat = nconf.get('default').category;
    let name = article || defaultName;
    let cat = category || defaultCat;
    let target = path.resolve(process.cwd(), `articles/${cat}`);
    let totalArticles = nconf.get('articles');

    if (!fs.existsSync(target)) {
        shell.mkdir('-p', target)
    }

    if (!(name && cat)) {
        console.info(`${chalk.bgRed('error')} : please set default article name and category in config.json`);
        process.exit(2);
    }

    // if category exist or not
    if (nconf.get(`menus:${cat}`)) {
        nconf.load();

        // update menus
        let currentCount = nconf.get(`menus:${cat}`);
        nconf.set(`menus:${cat}`, currentCount + 1);

        // update articles
        totalArticles.push({
            "title": `${name}`,
            "category": `${cat}`,
            "link": `${name}.html`
        });
        nconf.set('articles', totalContents);
        copyFn(sample, `${target}/${name}.md`).then(() => {
            console.info(`${chalk.bgBlueBright('ok')} : successfully create a new article which named ${name}.md`)
            nconf.save();
        }).catch((error) => {
            console.error(`${chalk.bgRed('error')} : this article name has already existed.`);
        })
    } else {
        nconf.load();

        // update menus
        nconf.set(`menus:${cat}`, 1);

        // update articles
        totalArticles.push({
            "title": `${name}`,
            "category": `${cat}`,
            "link": `${name}.html`
        });
        nconf.set('articles', totalArticles);
        copyFn(sample, `${target}/${name}.md`).then(() => {
            console.info(`${chalk.bgBlueBright('ok')} : successfully create a new category and article which named ${name}.md`)
            nconf.save();
        }).catch((error) => {
            console.error(`${chalk.bgRed('error')} : this article name has already existed.`);
        })
    }
}
