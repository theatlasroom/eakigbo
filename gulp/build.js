/**
* Build task
* - Minify assets (images, js, less)
* - fingerprint assets
*/
'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'run-sequence']
});

gulp.task('build', function(callback){
  $.runSequence('clean:build',['scripts', 'styles','images']);
});
