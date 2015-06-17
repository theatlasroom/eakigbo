/**
* Basic gulpfile to handle
* - asset minification / optimisation
* - image optimisations
*   - responsive sizes
*   - sprite generation
*/

var gulp = require('gulp');
var gutil = require('gulp-util');
var uglify = require('gulp-uglify');
var less = require('gulp-less');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var imageResize = require('gulp-image-resize');
var path = require('path');
var lr = require('tiny-lr');
var watch = require('gulp-watch');
var minifyCSS = require('gulp-minify-css');

var dist = "public/dist/";

gulp.task('scripts', function() {
  return gulp.src('public/javascripts/*.js')
    .pipe(uglify({outSourceMaps: true}))
    .pipe(gulp.dest(dist+'js'));
});

gulp.task('styles', function() {
  return gulp.src('public/stylesheets/*.less')
    //.pipe(watch())
    .pipe(less())
    .pipe(minifyCSS())
    .pipe(gulp.dest(dist+'css'));
});

gulp.task('imagemin', function () {
    return gulp.src('public/images/*.*')
        .pipe(imagemin())
        .pipe(gulp.dest(dist+'images'));
});

// default tasks
gulp.task('default', function() {
  gulp.run('scripts', 'styles');

  gulp.watch('js/**', function() {
    return gulp.run('scripts');
  });
  gulp.watch('css/**', function() {
    return gulp.run('styles');
  });
  gulp.watch('images/**', function() {
    return gulp.run('imagemin');
  });
  gulp.watch('*.html', function() {
    return gulp.run('html');
  });
});
