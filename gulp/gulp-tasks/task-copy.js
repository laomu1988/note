/**
 * 压缩复制文件到最终目录
 */
var gulp = require('gulp');
var miniCss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var replace = require('gulp-replace');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var cssSprite = require('gulp-css-spritesmith');
var dateformat = require('dateformat');

var version = dateformat('yyyy-mm-dd-hh');
var rename = require('gulp-rename');
var outFolder = './build/';
var destFolder = '../webroot/ask/';

gulp.task("js_min", function (cb) {
    try {
        return gulp.src(['./js/*.js', '!./js/*.min.js'])
            .pipe(uglify({mangle: true}))
            .pipe(rename(function (path) {
                path.extname = ".min.js";
            }))
            .pipe(gulp.dest('js'))
    }
    catch (e) {
        console.log(e);
        cb();
    }
});


gulp.task('copyJs',['js_min'], function () {
    gulp.src(['js/*.js'])
        //.pipe(jshint())
        .pipe(replace(/\?ver=[^\"]*/g, '?ver=' + version))
        //.pipe(uglify())
        .pipe(gulp.dest(outFolder + '/js'));
});

gulp.task('copyCss', function () {
    gulp.src(['css/*.*',]).pipe(gulp.dest(outFolder + '/css'));
});


gulp.task('copyImages', function () {
    gulp.src(['images/*.png',
        'images/*.jpg',
        'images/*.gif'
    ]).pipe(gulp.dest(outFolder + '/images'));
});

gulp.task('copyHTML', function () {
    gulp.src(['*.html'])
        //.pipe(replace(/\.css/g, '.min.css'))
        // .pipe(replace(/\.js/g, '.min.js'))
        .pipe(replace(/\?ver=[^\"]*/g, '?ver=' + version))
        .pipe(gulp.dest(outFolder));
});

gulp.task('copyLib', function () {
    gulp.src(['lib/**'])
        .pipe(gulp.dest(outFolder + '/lib'));
});
gulp.task('copyTestData', function () {
    gulp.src(['data/**'])
        .pipe(gulp.dest(outFolder + '/data'));
});

gulp.task('copyAll', ['copyLib', 'copyImages', 'copyCss', 'copyJs', 'copyTestData'], function () {
    if (destFolder) {
        gulp.src([outFolder + '**'])
            .pipe(gulp.dest(destFolder));
    }
})

gulp.task('copy', ['copyJs', 'copyCss', 'copyImages', 'copyHTML', 'copyTestData', 'copyLib', 'copyAll'], function () {
    console.log('copy task finished');
    gulp.exit();
    /*gulp.watch(['css/*.css'], ['copyCss', 'copyAll']);
    gulp.watch(['js/*.js'], ['copyJs', 'copyAll']);
    gulp.watch(['*.html'], ['copyHTML', 'copyImages', 'copyAll']);*/
});