var src = 'lib';
var dist = 'dist';
var gulp = require('gulp');
var jsdoc = require('gulp-jsdoc');
var babel = require('gulp-babel');
var jsSrc = src + '/**/*.js';

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
		.pipe(babel())
		.pipe(gulp.dest(dist));
});

gulp.task('default', ['watch']);
