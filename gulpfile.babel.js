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
    js: './src/js/*.js',
    jsMain: './src/js/main.js',
    less: './src/less/*.less',
    html: './src/index.html'
  },
  build: {
    folder: './build',
    js: './build/js/',
    jsName: 'snake.js',
    css: './build/css/',
    cssName: 'styles.min.css',
    html: './build/index.html'
  },
  dist: {
    folder: './dist/'
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
  runSequence(['clean', 'lint'], ['build:html', 'build:js', 'build:css'], 'inject', cb);
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
  return gulp.src(paths.src.jsMain)
    .pipe(plugins.plumber())
    .pipe(plugins.browserify())
    .pipe(plugins.rename(paths.build.jsName))
    .pipe(gulp.dest(paths.build.js));
});

gulp.task('build:css', () => {
  return gulp.src(paths.src.less)
    .pipe(plugins.plumber())
    .pipe(plugins.recess())
    .pipe(plugins.recess.reporter())
    .pipe(plugins.less())
    .pipe(plugins.concat(paths.build.cssName))
    .pipe(plugins.minifyCss())
    .pipe(gulp.dest(paths.build.css))
});

gulp.task('inject', cb => {
  runSequence('inject:js', 'inject:css', cb);
});

gulp.task('inject:js', () => {
  var jsFile = gulp.src(paths.build.js + paths.build.jsName, {
    read: false
  });

  return gulp.src(paths.build.html)
    .pipe(plugins.inject(jsFile, {relative: true}))
    .pipe(gulp.dest(paths.build.folder));
});

gulp.task('inject:css', () => {
  var cssFile = gulp.src(paths.build.css + paths.build.cssName, {
    read: false
  });

  return gulp.src(paths.build.html)
    .pipe(plugins.inject(cssFile, {relative: true}))
    .pipe(gulp.dest(paths.build.folder));
})

gulp.task('start', () => {
  gulp.src(paths.build.folder)
    .pipe(server({
      livereload: true,
      open: true
    }));
});

gulp.task('watch', () => {
  runSequence(['watch:html', 'watch:js', 'watch:less']);
});

gulp.task('watch:js', () => {
  plugins.watch(paths.src.js, () => {
    runSequence('lint', 'build:js', 'inject:js');
  });
});

gulp.task('watch:html', () => {
  plugins.watch(paths.src.html, () => {
    runSequence('build:html', 'inject');
  })
});

gulp.task('watch:less', () => {
  plugins.watch(paths.src.less, () => {
    runSequence('build:css', 'inject:css');
  });
});

gulp.task('dist', cb => {
  runSequence('dist:clean', 'build', 'js:min', cb);
});

gulp.task('dist:clean', cb => {
  return gulp.src(paths.dist.folder, {
    read: false
  })
  .pipe(plugins.clean({
    force: true
  }));
});

gulp.task('js:min', () => {
  return gulp.src(paths.build.js + paths.build.jsName)
    .pipe(plugins.jsmin())
    .pipe(plugins.rename({suffix: '.min'}))
    .pipe(gulp.dest(paths.dist.folder));
});

