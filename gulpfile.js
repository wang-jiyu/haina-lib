var gulp = require('gulp');
var ts = require('gulp-typescript');
var tsProj = ts.createProject('tsconfig.json');

const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const browserify = require("browserify")
const buffer = require("vinyl-buffer")
const source = require("vinyl-source-stream")
//class模式
gulp.task('es', function () {
    tsProj.options.target = 2;
    return gulp.src('src/**/*{ts,tsx}')
        .pipe(ts(tsProj))
        .pipe(gulp.dest('es'));
});

//var模式
gulp.task('lib', function () {
    tsProj.options.target = 1;
    return gulp.src('src/**/*{ts,tsx}')
        .pipe(ts(tsProj))
        .pipe(gulp.dest('lib'));
});


gulp.task("active", function () {
    return browserify({
        entries: ['lib/native/Es5Native.js'],
        debug: false, // 告知Browserify在运行同时生成内联sourcemap用于调试
    })
    .transform("babelify", { presets: ["es2015"] })
    .bundle()
    .pipe(source('haina.bound.js'))
    .pipe(buffer()) // 缓存文件内容
    .pipe(gulp.dest('dist/v1.0.0'))
})

gulp.task("ug",function(){
    return gulp.src("dist/v1.0.0/haina.bound.js")
    .pipe(uglify({
        compress:{
            drop_console:true
        }
    }))
    .pipe(gulp.dest('dist/v1.0.0'))
})

