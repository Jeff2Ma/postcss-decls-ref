var gulp = require('gulp');
var postcss = require('gulp-postcss');
var ref = require('./index.js');
var mocha = require('gulp-mocha');
var sourcemaps = require('gulp-sourcemaps');
var perfectionist = require('perfectionist');
var rename = require('gulp-rename');

var files = ['index.js'];
var watchFiles = ['index.js', 'gulpfile.js', 'test/**/**', 'example/**/*.css'];

gulp.task('lint', function () {
	var eslint = require('gulp-eslint');
	return gulp.src(files)
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(eslint.failAfterError());
});

gulp.task('test', function () {
	return gulp.src('test/*.js', {read: false})
		.pipe(mocha({timeout: 1000000}));
});

gulp.task('css', function () {
	return gulp.src('./example/input.css')
		.pipe(sourcemaps.init())
		.pipe(postcss([ref({
				refMod: 'group', // `clone` or `group`
				dynamicAtRule: 'ref' // default atRule name
			}
		)]))
		.pipe(rename('output.css'))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('./example'));
});

gulp.task('default', ['css', 'watch']);

gulp.task('watch', function () {
	gulp.watch(watchFiles, ['css', 'test', 'lint']);
	// gulp.watch(watchFiles, ['css']);
});
