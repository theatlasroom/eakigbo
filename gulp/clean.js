/**
 * Clean build and dist dirs
 *
 */
'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del']
});

gulp.task('clean:images', function (done) {
  $.del([path.join(conf.paths.dist,'/images')], done);
});

gulp.task('clean:scripts', function (done) {
  $.del([path.join(conf.paths.dist,'/js')], done);
});

gulp.task('clean:styles', function (done) {
  $.del([path.join(conf.paths.dist,'/css')], done);
});

gulp.task('clean:build', function (done) {
  $.del([path.join(conf.paths.dist, '/')], done);
});
