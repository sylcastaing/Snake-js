'use strict';

import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import lazypipe from 'lazypipe';
import server from 'gulp-server-livereload';
import runSequence from 'run-sequence';

var plugins = gulpLoadPlugins();

const paths = {
  src: {
    folder: './src',
    js: './src/**/*.js',
    html: './src/index.html'
  },
  build: {
    folder: './build',
    js: './build/js/',
    jsName: 'snake.js',
    html: './build/index.html'
  },
  dist: {

  }
};

let jsLint = lazypipe()
  .pipe(plugins.jshint, '.jshintrc')
  .pipe(plugins.jshint.reporter, 'jshint-stylish');

gulp.task('default', ['dev']);

gulp.task('dev', cb => {
  runSequence('build', 'start', 'watch', cb);
});

gulp.task('build', cb => {
  runSequence(['clean', 'lint'], ['build:html', 'build:js'], 'inject:js', cb);
});

gulp.task('clean', () => {
  return gulp.src(paths.build.folder, {
    read: false
  })
  .pipe(plugins.clean({
    force: true
  }));
});

gulp.task('lint', () => {
  return gulp.src(paths.src.js)
    .pipe(jsLint())
});

gulp.task('build:html', () => {
  return gulp.src(paths.src.html)
    .pipe(plugins.htmlmin({
      collapseWhitespace: true
    }))
    .pipe(gulp.dest(paths.build.folder));
});

gulp.task('build:js', () => {
  return gulp.src(paths.src.js)
    .pipe(plugins.concat(paths.build.jsName))
    .pipe(gulp.dest(paths.build.js));
});

gulp.task('inject:js', () => {
  var jsFile = gulp.src(paths.build.js + paths.build.jsName, {
    read: false
  });

  return gulp.src(paths.build.html)
    .pipe(plugins.inject(jsFile, {relative: true}))
    .pipe(gulp.dest(paths.build.folder));
});

gulp.task('start', () => {
  gulp.src(paths.build.folder)
    .pipe(server({
      livereload: true,
      open: true
    }));
});

gulp.task('watch', () => {
  runSequence(['watch:html', 'watch:js']);
});

gulp.task('watch:js', () => {
  plugins.watch(paths.src.js, () => {
    runSequence('lint', 'build:js', 'inject:js');
  });
});

gulp.task('watch:html', () => {
  plugins.watch(paths.src.html, () => {
    runSequence('build:html');
  })
});

gulp.task('dist', () => {

});

gulp.task('js:min', () => {

});

