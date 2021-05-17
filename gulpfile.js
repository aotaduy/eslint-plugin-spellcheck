(function () {
   'use strict';
   var gulp = require('gulp'),
		istanbul = require('gulp-istanbul'),
		mocha = require('gulp-mocha');

	gulp.task('test', function (cb) {
		gulp.src(['rules/*.js'])
			.pipe(istanbul()) // Covering files
			.pipe(istanbul.hookRequire()) // Force `require` to return covered files
			.on('finish', function () {
				gulp.src(['test/*.js', '!test/performance.js'])
					.pipe(mocha({ timeout: 100000 }))
					.pipe(istanbul.writeReports()) // Creating the reports after tests runned
					.on('end', cb);
		});
	});

	gulp.task('default', gulp.parallel('test'));
}());
