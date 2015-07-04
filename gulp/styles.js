/**
* Styles task
* - minify and concat less into css
*/

'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');


var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del']
});

var wiredep = require('wiredep').stream;
var _ = require('lodash');

gulp.task('styles', ['clean:styles'], function () {
  return gulp.src([
    path.join(conf.paths.src, '/**/*.less')
  ])
    .pipe(wiredep(_.extend({}, conf.wiredep))) // wires the scss dependencies needed
    .pipe($.sourcemaps.init())
    .pipe($.less()).on('error', conf.errorHandler('Less'))
    .pipe($.autoprefixer()).on('error', conf.errorHandler('Autoprefixer'))
    .pipe($.concat('eakigbo.css'))
    .pipe($.minifyCss())
    .pipe(gulp.dest(path.join(conf.paths.dist, '/css')))
    .pipe($.size());
});
