'use strict';

import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import lazypipe from 'lazypipe';
import server from 'gulp-server-livereload';

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

gulp.task('clean', () => {
  return gulp.src(paths.build.folder, {
    read: false
  })
  .pipe(plugins.clean({
    force: true
  }));
});

gulp.task('build', ['clean'], () => {
  gulp.src(paths.src.js)
    .pipe(jsLint())
    .pipe(plugins.concat(paths.build.jsName))
    .pipe(gulp.dest(paths.build.js));

  gulp.src(paths.src.html)
    .pipe(plugins.htmlmin({
      collapseWhitespace: true
    }))
    .pipe(gulp.dest(paths.build.folder));
});

gulp.task('inject:js', () => {
  var jsFile = gulp.src(paths.build.js + paths.build.jsName, {
    read: false
  });

  return gulp.src(paths.build.html)
    .pipe(plugins.inject(jsFile))
    .pipe(gulp.dest(paths.build.html));
});

gulp.task('dev', ['build', 'watch'], () => {
  gulp.src(paths.build.folder)
    .pipe(server({
      livereload: true,
      open: true
    }));
});

gulp.task('watch', ['watch:js', 'watch:html']);

gulp.task('watch:js', () => {
  plugins.watch(paths.src.js, () => {
    gulp.src(paths.src.js)
      .pipe(jsLint())
      .pipe(plugins.concat(paths.build.jsName))
      .pipe(gulp.dest(paths.build.js));
  })
});

gulp.task('watch:html', () => {
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

