/**
* watch.js gulp task
* - watch css files for changes
* - watch js files for changes
* - watch assets for changes
*/
'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'run-sequence']
});

// checks for the type of event, we only want to run updateswith changed files
function isOnlyChange(event) {
  return event.type === 'changed';
}

gulp.task('watch', function(){

  // watch the sass files for changes
  gulp.watch([
    // path.join(conf.paths.src, '/sass/**/*.css'),
    path.join(conf.paths.src, '/less/**/*.less')
  ], function(event) {
    if(isOnlyChange(event)) {
      gulp.start('styles');
    } else {
      //gulp.start('inject:build');
    }
  });

  // watch the js source files for changes
  gulp.watch(path.join(conf.paths.src, '/js/**/*.js'), function(event) {
    if(isOnlyChange(event)) {
      gulp.start('scripts');
    } else {
      //gulp.start('inject:build');
    }
  });
});
