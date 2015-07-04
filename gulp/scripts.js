/**
* Scripts task
* - minify and concat js files
*/

'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var series = require('stream-series');
var $ = require('gulp-load-plugins')();

gulp.task('scripts', ['clean:scripts'], function () {
  /*// load config scripts first
  var configs = gulp.src([
      path.join(conf.paths.src,"/js/modules.js"),
      path.join(conf.paths.src,"/js/run.js")
  ]);*/

  // load the app scripts after
  var app = gulp.src([
      path.join(conf.paths.src, '/**/*.js'),
  ]);

  var orderedStreams = series(app);
  return orderedStreams
    .pipe($.filter(['**/*.js']))
    //.pipe($.filelog()) // used to output the list of files passing through the stream
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.sourcemaps.init())
    .pipe($.concat('main.js'))
    .pipe($.stripDebug())
    .pipe($.uglify())
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest(path.join(conf.paths.dist, '/js')))
    .pipe($.size())
});
