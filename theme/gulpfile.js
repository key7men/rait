// @CreateTime: 2021/3/3
// @Author: key7men
// @Contact: key7men@gmail.com
// @Last Modified By: key7men
// @Last Modified Time: 10:23 AM
// @Description: work flow of generating template file

const fs = require('fs');
const path = require('path');
const gulp = require('gulp');
const del = require('del');
const sass = require('gulp-sass');
const pug = require('gulp-pug');
const chalk = require('chalk');
const replacestream = require('replacestream');
const replace = require('replace-in-file');
const rename = require('gulp-rename');
const webserver = require('gulp-webserver');

sass.compiler = require('node-sass');
const config = require('./config.json');
const DEST = 'public';

function cachePug(config) {
    let articles = config.articles;
    let menus = config.menus;
    let len = articles.length;

    let options = {
        files: './template/pug/cache.pug',
        from: ['#{Menus}', '#{Articles}'],
        to: [JSON.stringify(menus), JSON.stringify(articles)],
        encoding: 'utf8'
    };

    replace.sync(options);

    // inject .md file to content pug
    for (let index = 0; index < len; index++) {
        let article = articles[index];
        if (index !== (len - 1)) {
            fs.createReadStream(path.join(__dirname, './template/pug/cache.pug'))
                .pipe(replacestream('#{Filepath}', `../articles/${article.category}/${article.title}.md`))
                .pipe(fs.createWriteStream(`${DEST}/${article.title}.pug`))
        } else {
            fs.createReadStream(path.join(__dirname, './template/pug/cache.pug'))
                .pipe(replacestream('#{Filepath}', `../articles/${article.category}/${article.title}.md`))
                .pipe(fs.createWriteStream(`${DEST}/index.pug`))
        }
    }
}

function clean() {
    del(['public/**/*']);
    console.info(`${chalk.green('info ')} : Successfully Delete Old Blog`);
    return gulp.src('template/pug/content.pug')
        .pipe(rename("cache.pug"))
        .pipe(gulp.dest('template/pug'))
}

function style() {
    return gulp.src(['template/scss/**/*.scss'])
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(gulp.dest(DEST));
}

function copyPug() {
    try {
        cachePug(config);
    } catch (error) {
        console.info(`${chalk.bgRed('error ')}:${error}`);
    }
    return gulp.src(['template/pug/**/*.pug', '!template/pug/content.pug'])
        .pipe(gulp.dest(DEST));
}

function html() {
    return gulp.src(['public/**/*.pug', '!public/**/cache.pug'])
        .pipe(pug({}))
        .pipe(gulp.dest(DEST));
}

function serve() {
    return gulp.src('public')
        .pipe(webserver({
            livereload: {
                enable: true,
            },
            // directoryListing: true,
            open: true,
            host: '0.0.0.0',
            port: 8000,
        }))
}

exports.default = gulp.series(clean, style, copyPug, html);
exports.server = gulp.series(clean, style, copyPug, html, serve);
