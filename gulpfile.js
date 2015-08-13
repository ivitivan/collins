var src = 'src';
var dist = './';
var gulp = require('gulp');
var jsdoc = require('gulp-jsdoc');
var babel = require('gulp-babel');
var plumber = require('gulp-plumber');
var jsSrc = src + '/**/*.js';
var errorHandler = require('./gulp/utils/errorHandler.js');
var mocha = require('gulp-mocha');

gulp.task('watch', function() {
	gulp.watch(jsSrc, ['babel']);
});

// TODO: seems like jsdoc-gulp uses old version of jsdoc and doesnt want to work with ES6
gulp.task('jsdoc', function() {
	gulp.src(jsSrc)
		.pipe(jsdoc('./doc'))
});

gulp.task('babel', function() {
	return gulp.src(jsSrc)
		.pipe(plumber({errorHandler: errorHandler}))
		.pipe(babel())
		.pipe(plumber.stop())
		.pipe(gulp.dest(dist));
});

gulp.task('test', function() {
	return gulp.src('./test/collinsSpec.js', {read: false})
		.pipe(mocha({reporter: 'nyan'}));
});

gulp.task('default', ['watch']);
