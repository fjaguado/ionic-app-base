var gulp            = require('gulp');
var watch           = require('gulp-watch');
var runSequence     = require('run-sequence');
var del             = require('del');
var notify          = require('gulp-notify');
var gutil           = require('gulp-util');
var bower           = require('bower');
var concat          = require('gulp-concat');
var sass            = require('gulp-sass');
var rename          = require('gulp-rename');
var sh              = require('shelljs');
var browserify      = require('browserify');
var babelify        = require('babelify');
var source          = require('vinyl-source-stream');
var templateCache   = require('gulp-angular-templatecache');

var paths = {
  sass: ['./src/scss/**/*.scss'],
  javascript: ['./src/js/**/*.js', '!./src/js/config/app.templates.js'],
  html: ['./src/js/**/*.html'],
  images: ['./src/img/**/*'],
  lib : ['./src/lib/**/*']
};

var interceptErrors = function(error) {
  var args = Array.prototype.slice.call(arguments);

  // Send error to notification center with gulp-notify
  notify.onError({
    title: 'Compile Error',
    message: '<%= error.message %>'
  }).apply(this, args);

  // Keep gulp from hanging on this task
  this.emit('end');
};

gulp.task('default', ['sass','views','javascript']);

gulp.task('javascript', function() {
  return browserify('./src/js/app.js', { debug: true })
    .transform('babelify', {presets: ['es2015'], sourceMapRelative: '.'})
    .bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest('./www/js'));
});

gulp.task('sass', function(done) {
  gulp.src('./src/scss/ionic.app.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});
// Generates template cache file
gulp.task('views', function() {
  return gulp.src(paths.html)
    .pipe(templateCache({
      standalone: true
    }))
    .on('error', interceptErrors)
    .pipe(rename("app.templates.js"))
    .pipe(gulp.dest('./src/js/config/'));
});
// Copy images from src to www
gulp.task('images', function() {
  return gulp.src(paths.images)
    .on('error',interceptErrors)
    .pipe(gulp.dest('./www/img/'));
});
// Empty destination folder
gulp.task('empty', function() {
  return del(['./www/**/*', "!./www/lib/**/*"]);
});
gulp.task('empty-images', function () {
  return del('./www/img/**/*');
});
// Copy bower libraries to destination folder
gulp.task('lib', function() {
  return gulp.src(paths.lib)
    .on('error', interceptErrors)
    .pipe(gulp.dest('./www/lib/'));
});

gulp.task('index', function(){
  return gulp.src('./src/index.html')
    .pipe(gulp.dest('./www/'));
});
// Initial empty
gulp.task('init', function(cb) {
  runSequence('empty','lib','index',['sass','javascript','views'],'watch',cb);
});

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
  watch(paths.javascript, {ignoreInitial:false},function(){
    gulp.start('javascript',['views']);
  });
  watch(paths.html, {ignoreInitial:false},function(){
    gulp.start('views');
  });
  watch(paths.images, {ignoreInitial:false},function(vinyl){
    if ( vinyl.event === 'unlink' || vinyl.event === 'change'){
      // Remove files in destination
      runSequence('empty-images','images');
    }else{
      gulp.start('images');
    }
  });
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});
