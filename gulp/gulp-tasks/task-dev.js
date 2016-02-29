/**
 * 编译scss文件和riot的tag文件
 * */
var gulp = require('gulp');
var riot_css = require('gulp-riot-css');
var sass = require('gulp-sass');
var replace = require('gulp-replace');
var rename = require('gulp-rename');
var import_file = require('gulp-imports');
var minifyCSS = require('gulp-minify-css');
var dateformat = require('dateformat');
var version = dateformat('yyyy-mm-dd-hh');
var cssSprite = require('gulp-css-spritesmith');
var rjs = require('gulp-requirejs');
var uglify = require('gulp-uglify');

(function () {
    // gulp-riot-css编译生成js和scss文件
    var folders = [
        {folder: 'index'},
        {folder: 'common', js: 'tag_common.js'},
        {folder: 'question'},
        {folder: 'exp'},
        {folder: 'search'},
        {folder: 'dialog'},
        {folder: 'module'},
        {folder: 'topic'},
        {folder: 'user'}
    ];
    var tasks = [];
    for (var i = 0; i < folders.length; i++) {
        (function (setting) {
            var folder = setting['folder'];
            tasks.push('tag_build_' + folder);
            gulp.task('tag_build_' + folder, function () {
                return gulp.src(['tags/' + folder + '/*.html'])
                    .pipe(riot_css({
                        define: 'tags/',
                        css: setting.css ? '../../scss/tags/' + setting.css : '',
                        js: setting.js ? '' + setting.js : ''
                    }))
                    .pipe(gulp.dest('./js_src/tags/'));
            });
        })(folders[i]);
    }
    gulp.task('tag_build', tasks, function () {
        return gulp.src(['tags/*.html'])
            .pipe(riot_css({
                css: 'css/tags/_tags.scss',
                js: 'js_src/tags/_tag.js'
            }))
            .pipe(gulp.dest('./'));
    });
})();


gulp.task("js",["tag_build"], function () {
    // import,require,minjs

    return gulp.src(['./js_src/*.js', './js_src/*/*.js'])
        .pipe(import_file())
        .pipe(gulp.dest('../js'))
});

gulp.task("js_min", ['import_file'], function (cb) {
    try {
        var pages = ['question', 'exp', 'index', 'topic', 'search'];
        for (var i = 0; i < pages.length; i++) {
            console.log('js_min ', pages[i]);
            rjs({
                name: pages[i],
                baseUrl: '../js/',
                out: pages[i] + '.js'
            }).pipe(gulp.dest('../js/')); // pipe it to the output DIR
        }
        //console.log('js_min 2');
        return gulp.src(['../js/*.js', '!../js/*.min.js'])
            .pipe(uglify({mangle: true}))
            .pipe(rename(function (path) {
                path.extname = ".min.js";
            }))
            .pipe(gulp.dest('../js/'))
    }
    catch (e) {
        console.log(e);
        cb();
    }
});




gulp.task('scss', function () {
    return gulp.src('./css/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./css'))
        .pipe(gulp.dest('./../css'))
});

gulp.task('cssSprite', ['scss'], function () {
    // 自动雪碧图
    return gulp.src('css/*.css').pipe(cssSprite({
        // sprite背景图源文件夹，只有匹配此路径才会处理，默认 images/slice/
        imagepath: 'sprite/',
        // 映射CSS中背景路径，支持函数和数组，默认为 null
        imagepath_map: null,
        // 雪碧图输出目录，注意，会覆盖之前文件！默认 images/
        spritedest: 'images/',
        // 替换后的背景路径，默认 ../images/
        spritepath: '../images/',
        // 各图片间间距，如果设置为奇数，会强制+1以保证生成的2x图片为偶数宽高，默认 0
        padding: 2,
        // 是否使用 image-set 作为2x图片实现，默认不使用
        useimageset: false,
        // 是否以时间戳为文件名生成新的雪碧图文件，如果启用请注意清理之前生成的文件，默认不生成新文件
        newsprite: false,
        // 给雪碧图追加时间戳，默认不追加
        spritestamp: true,
        // 在CSS文件末尾追加时间戳，默认不追加
        cssstamp: true
    })).pipe(gulp.dest('../'));
});


gulp.task('minify-css', ['cssSprite'], function () {
    return gulp.src(['../css/*.css', '!../css/*.min.css'])
        .pipe(minifyCSS({keepBreaks: true}))
        .pipe(rename(function (path) {
            path.extname = ".min.css";
        }))
        .pipe(gulp.dest('../css'))
});



gulp.task('html', function () {
    return gulp.src(['./*.html', '!./_*.html'])
        .pipe(import_file())
        .pipe(replace(/\?ver=[^\"]*/g, '?ver=' + version))
        .pipe(gulp.dest('../'))
});


gulp.task('dev', ['tag_build', 'scss', 'cssSprite', 'minify-css', 'import_file', 'js_min', 'html'], function () {
    // livereload.listen();
    gulp.watch(['./css/*.scss', './css/**/*.scss'], ['scss', 'cssSprite', 'minify-css']);
    gulp.watch(['./tags/**/*.html'], ['tag_build']);
    gulp.watch(['./js_src/*.js', './js_src/**/*.js'], ['import_file', 'js_min']);
    //gulp.watch(['./js/*.js', '!./js/*.min.js'], ['js_min']);
    gulp.watch(['./*.html'], ['html']);
});
