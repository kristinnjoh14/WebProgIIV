var gulp = require('gulp');
var ts = require('gulp-typescript');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

gulp.task('ts', function () {
    gulp.src('src/**/*.ts')
        .pipe(ts({
            noImplicitAny: true,
            out: 'output.js'
        }))
        .pipe(gulp.dest('./tmp/ts'));
});

gulp.task('default', ['ts'], function() {
    gulp.src(['vendor/**/*.js', './tmp/ts/output.js'])
        .pipe(sourcemaps.init())
        .pipe(uglify(uglifyOptions).on('error', function(uglify) {
        console.error(uglify.message);
        console.error("Line "+uglify.lineNumber);
        this.emit('end');
    }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./dist/'));
});