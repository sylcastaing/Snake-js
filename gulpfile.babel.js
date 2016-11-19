'use strict';

import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import lazypipe from 'lazypipe';
import server from 'gulp-server-livereload';

var plugins = gulpLoadPlugins();

const paths = {
  src: {
    folder: './src',
    js: './src/js/*.js',
    html: './src/index.html'
  },
  build: {
    folder: './build',
    js: './build/snake.js',
    html: './build/index.html'
  },
  dist: {

  }
};

let jsLint = lazypipe()
  .pipe(plugins.jshint, '.jshintrc')
  .pipe(plugins.jshint.reporter, 'jshint-stylish');

gulp.task('default', ['dev']);

gulp.task('dev', ['watch'], () => {
  gulp.src(paths.build.folder)
    .pipe(server({
      livereload: true,
      open: true
    }));
});

gulp.task('watch', () => {
  plugins.watch(paths.src.js)
    .pipe(plugins.plumber())
    .pipe(jsLint());

  plugins.watch(paths.src.html)
    .pipe(plugins.htmlmin({
      collapseWhitespace: true
    }))
    .pipe(gulp.dest(paths.build.folder));
});

gulp.task('dist-build', () => {

});

gulp.task('dist-serv', ['dist-build'], () => {

});

