var gulp = require('gulp');
var jscs = require('gulp-jscs');
var jshint = require('gulp-jshint');

gulp.task('test', function () {
    return gulp.src([
            'app/assets/**/*.js'
        ])
        .pipe(jshint())
        .pipe(jscs());
});
