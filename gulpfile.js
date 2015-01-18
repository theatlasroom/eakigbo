var gulp = require('gulp');
var bowerFiles = require('main-bower-files');
var sequence = require('run-sequence');
var uglify = require('gulp-uglify');
var clean = require('gulp-clean');
var lessc = require('gulp-less');
var concat = require('gulp-concat');
var striplog = require('gulp-strip-debug');
//var striplog = require('gulp-strip-debug');
var minfycss = require('gulp-minify-css');
var sourcemaps = require('gulp-sourcemaps');
var template = require('gulp-template-compile');

// config paths
var config = {
  sassPath: './sass',
  bowerDir: './bower_components'
};

// compile the bower files into a libs folder
gulp.task('bower-compile', function(){
	return gulp.src(bowerFiles())
	  .pipe(gulp.dest('dist/libs')) // save the file
	  .on('error', gutil.log); 
});

// precompile the templates
gulp.task('less', function(){
  gulp.src('./less/*.less')
  	.pipe(sourcemaps.init())
    .pipe(lessc())
    .pipe(concat('eakigbo.css'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./css'));
});

// Clean the templates
gulp.task('clean-less', function() {
  return gulp.src(['./css/*'], {read: false})
    .pipe(clean());
});

// precompile the templates
gulp.task('tmpl', function(){
  gulp.src('./js/templates/** /*.html')
    .pipe(template({namespace: 'haleyk_templates'}))
    .pipe(concat('templates.js'))
    .pipe(gulp.dest('./scripts/haleyk/templates/'));
});

// Clean the templates
gulp.task('clean-templates', function() {
  return gulp.src(['./js/templates/**/*.js'], {read: false})
    .pipe(clean());
});

gulp.task('glessc', ['clean-less'], function() {
   gulp.start('less');
});

gulp.task('templates', ['clean-templates'], function() {
   gulp.start('tmpl');
});

gulp.task('watch', function () {
   gulp.watch('./less/**/*.less', ['glessc']);
   gulp.watch('./js/templates/**/*.html', ['templates']);
});

