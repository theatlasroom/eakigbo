/**
* Images task
* - optimise the images
* - create responsive alternatives for each image
*/

'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');


var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'run-sequence']
});

var wiredep = require('wiredep').stream;
var _ = require('lodash');

var dist = path.join(conf.paths.dist,'/images');
var src = path.join(conf.paths.src,'/images/*.{jpg,png}');

gulp.task('images', function(){
  return $.runSequence('clean:images',['responsive:xl','responsive:lg', 'responsive:md', 'responsive:sm']);
});

gulp.task("responsive:xl", function () {
  return gulp.src(src)
    .pipe(gulp.dest(dist));
});

gulp.task("responsive:lg", function () {
  return gulp.src(src)
    .pipe($.imageResize({ width : 1440 }))
    .pipe($.rename(function (path) { path.basename += "-1440"; }))
    .pipe($.imagemin())
    .pipe(gulp.dest(dist));
});

gulp.task("responsive:md", function () {
  return gulp.src(src)
    .pipe($.imageResize({ width : 768 }))
    .pipe($.rename(function (path) { path.basename += "-768"; }))
    .pipe($.imagemin())
    .pipe(gulp.dest(dist));
});

gulp.task("responsive:sm", function () {
  return gulp.src(src)
    .pipe($.imageResize({ width : 480 }))
    .pipe($.rename(function (path) { path.basename += "-480"; }))
    .pipe($.imagemin())
    .pipe(gulp.dest(dist));
});
