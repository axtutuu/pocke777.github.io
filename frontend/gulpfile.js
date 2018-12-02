const gulp = require('gulp');
const webpackStream = require('webpack-stream');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config');
const browserSync = require('browser-sync');
const rename = require("gulp-rename");
const cssnext = require('postcss-cssnext');
const postcss = require('gulp-postcss');
const pleeease = require('gulp-pleeease');
const readConfig = require('read-config');
const documentation = require('gulp-documentation');
const cleanCSS = require('gulp-clean-css');
const gzip = require("gulp-gzip");
const pug = require("gulp-pug");

const sass = require('gulp-sass');
const sassGlob = require('gulp-sass-glob');
const sassLint = require('gulp-sass-lint');
const argv = require('minimist')(process.argv.slice(2));

const SRC = './src';
const DEST = '../dest';
const CONFIG = './src/config';

if (argv.mode === 'development') {
  webpackConfig.mode = 'development'
} else {
  webpackConfig.mode = 'production'
}

gulp.task('doc', function () {
  return gulp.src('./src/**/*.{js,vue}')
    .pipe(documentation('html', {}, {
      name: 'RICHKA CAST',
      version: '1.0.0'
    }))
    .pipe(gulp.dest('docs'));
});


gulp.task('pug', () => {
  return gulp.src(`${SRC}/html/**/[!_]*.pug`)
    .pipe(pug({
      pretty: true,
      basedir: `${SRC}/html`
    }))
    .pipe(gulp.dest(`${DEST}`));
});

gulp.task('image', function() {
  return gulp.src(`${SRC}/images/**/*`)
    .pipe(gulp.dest(`${DEST}/images`))
});

gulp.task('javascript', function() {
  return webpackStream(webpackConfig, webpack)
    .pipe(gulp.dest(`${DEST}/assets/`));
});


gulp.task('sass', () => {
  const config = readConfig(`${CONFIG}/pleeease.json`);
  const pipe = gulp.src(`${SRC}/stylesheets/application.scss`)
      .pipe(sassGlob())
      .pipe(sass())
      .pipe(postcss([cssnext()]))
      .pipe(pleeease(config))
      .pipe(cleanCSS());
  return pipe.pipe(gulp.dest(`${DEST}/assets/`));
});

gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: DEST,
    },
    open: false,
  });

  gulp.watch('src/html/**/*.pug', ['pug', 'reload']);
  gulp.watch('src/stylesheets/**/*.scss', ['sass', 'reload']);
  gulp.watch('src/javascripts/**/*.js', ['javascript', 'reload']);
  gulp.watch('src/images/**/*', ['image', 'reload']);
});

gulp.task('reload', function () {
    browserSync.reload();
});

gulp.task('build', ['javascript', 'sass', 'pug', 'image']);
gulp.task('default', ['build', 'browser-sync']);
