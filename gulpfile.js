var gulp = require('gulp');
var uglify = require('gulp-uglify');
var clean = require('gulp-clean');
var lessc = require('gulp-less');
var concat = require('gulp-concat');
var striplog = require('gulp-strip-debug');
//var striplog = require('gulp-strip-debug');
var minfycss = require('gulp-minify-css');
var sourcemaps = require('gulp-sourcemaps');
var template = require('gulp-template-compile');

// precompile the templates
gulp.task('less', function(){
  gulp.src('./styles/build/haleyk/haleyk.less')
  	.pipe(sourcemaps.init())
    .pipe(lessc())
    .pipe(concat('haleyk-dist.css'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./styles'));
});


// Clean the templates
gulp.task('clean-less', function() {
  return gulp.src(['./styles/haleyk-dist.css','./styles/haleyk-dist.css.map'], {read: false})
    .pipe(clean());
});


gulp.task('glessc', ['clean-less'], function() {
   gulp.start('less');
});

// precompile the templates
gulp.task('tmpl', function(){
  gulp.src('./scripts/haleyk/templates/**/*.html')
    .pipe(template({namespace: 'haleyk_templates'}))
    .pipe(concat('templates.js'))
    .pipe(gulp.dest('./scripts/haleyk/templates/'));
});

// Clean the templates
gulp.task('clean-templates', function() {
  return gulp.src(['./script/templates/**/*.js'], {read: false})
    .pipe(clean());
});

gulp.task('templates', ['clean-templates'], function() {
   gulp.start('tmpl');
});

gulp.task('watch', function () {
   gulp.watch('./styles/**/*.less', ['glessc']);
   gulp.watch('./scripts/**/*.html', ['templates']);
   //gulp.watch('./js/templates/**/*.html', ['tmpl']);
});

