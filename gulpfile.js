(function () {
   'use strict';
   var gulp = require('gulp'),
		istanbul = require('gulp-istanbul'),
		mocha = require('gulp-mocha');

	gulp.task('test', function (cb) {
		return gulp.src(['rules/*.js'])
			.pipe(istanbul()) // Covering files
			.pipe(istanbul.hookRequire()) // Force `require` to return covered files
			.on('finish', function () {
				gulp.src(['test/*.js', '!test/performance.js'])
					.pipe(mocha())
					.pipe(istanbul.writeReports()) // Creating the reports after tests ran
					.on('end', cb);
		});
	});

  gulp.task('performance', function (cb) {
				return gulp.src([ 'test/performance.js'])
					.pipe(mocha({timeout: 500})) // 500 ms
					.on('end', cb);
		});

	gulp.task('default', gulp.parallel('test'));
}());
