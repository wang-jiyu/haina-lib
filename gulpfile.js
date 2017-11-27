var gulp = require('gulp');
var ts = require('gulp-typescript');
var spritesmith = require('gulp.spritesmith');
var changed = require('gulp-changed');
var runSequence = require('run-sequence');
var sourcemaps = require('gulp-sourcemaps');
var rename = require('gulp-rename');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var tsProj = ts.createProject('tsconfig.json');
var livereload = require('gulp-livereload');


//class模式
gulp.task('es', function () {
    tsProj.options.target=2;
    return gulp.src('src/**/*{ts,tsx}')
        .pipe(ts(tsProj))
        .pipe(gulp.dest('es'));
});

//var模式
gulp.task('lib', function () {
    tsProj.options.target=1;
    return gulp.src('src/**/*{ts,tsx}')
        .pipe(ts(tsProj))
        .pipe(gulp.dest('lib'));
});
 

