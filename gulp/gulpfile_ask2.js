var fs = require('fs');
var path = require('path');
var gulp = require('gulp');
var dateformat = require('dateformat');
var doc = require('gulp-lazy-doc');

var plugins = require('gulp-load-plugins')({
    // DEBUG: true,
    pattern: ['gulp-*', 'gulp.*'],
    replaceString: /\bgulp[\-.]/
});
var config = {
    src: 'src/',
    dest: 'dest/',
    version: function () {
        return dateformat('yyyy-mm-dd-hh');
    }
};

gulp.task('riot', function () {
    // common文件夹下的单独合并成一个文件
    gulp.src([config.src + 'tags/common/*.html'])
        .pipe(plugins.riotCss({define: 'tags/', js: 'tag_common.js'}))
        .pipe(gulp.dest(config.dest + 'js/tags/'));
    // 其他文件夹下的文件分别单独生成
    return gulp.src([config.src + 'tags/*.html', config.src + 'tags/*/*.html', '!' + config.src + 'tags/*/_*.html'])
        .pipe(plugins.riotCss({}))
        .pipe(gulp.dest(config.dest + 'js/tags/'));
});

gulp.task('importjs', ['riot'], function () {
    // importjs
    return gulp.src([config.src + 'js/*.js', config.src + 'js/*/*.js'])
        .pipe(gulp.dest(config.dest + 'js'))
        .pipe(plugins.imports())
        .pipe(plugins.replace(/ver=version/g, 'ver=' + config.version()))
        .pipe(gulp.dest(config.dest + 'js'));
    //console.log('import完毕；')
});

gulp.task('requirejs', ['importjs'], function (cb) {
    // requirejs
    var files = fs.readdirSync(config.dest + 'js');
    var requirejs = plugins.requirejs;
    files.forEach(function (file) {
        if (file.indexOf('common') >= 0) {
            return;
        }
        fs.stat(config.dest + 'js\\' + file, function (err, stat) {
            if (err) {
                return console.log(err);
            }
            if (!stat.isDirectory()) {
                requirejs({
                    name: file.substring(0, file.lastIndexOf('.')),
                    baseUrl: config.dest + 'js/',
                    out: file
                }).pipe(gulp.dest(config.dest + 'js/')); // pipe it to the output DIR
            }
        });
    });
    cb();
});
gulp.task('jsmin', ['requirejs'], function () {
    // min js
    return gulp.src([config.dest + 'js/*.js', '!' + config.dest + '/js/*.min.js'])
        .pipe(plugins.uglify({mangle: true}))
        .pipe(plugins.rename(function (path) {
            path.extname = ".min.js";
        }))
        .pipe(gulp.dest(config.dest + 'js/'))
});
gulp.task('js', ['importjs', 'requirejs', 'jsmin']);


gulp.task('scss', function () {
    return gulp.src(config.src + 'css/*.scss')
        .pipe(plugins.sass().on('error', plugins.sass.logError))
        //.pipe(gulp.dest(config.src + 'css'))
        .pipe(gulp.dest(config.dest + 'css'))
});

gulp.task('cssSprite', ['scss'], function () {
    // 自动雪碧图
    return gulp.src([config.dest + 'css/*.css', '!' + config.dest + 'css/*.min.css']).pipe(plugins.cssSpritesmith({
        // sprite背景图源文件夹，只有匹配此路径才会处理，默认 images/slice/
        imagepath: config.dest + 'css/sprite/',
        // 映射CSS中背景路径，支持函数和数组，默认为 null
        imagepath_map: null,
        // 雪碧图输出目录，注意，会覆盖之前文件！默认 images/
        spritedest: config.dest + 'images/',
        // 替换后的背景路径，默认 ../images/
        spritepath: '../images/',
        // 各图片间间距，如果设置为奇数，会强制+1以保证生成的2x图片为偶数宽高，默认 0
        padding: 2,
        // 是否使用 image-set 作为2x图片实现，默认不使用
        useimageset: false
    })).pipe(gulp.dest('./'));
});


gulp.task('cssmin', ['cssSprite'], function () {
    return gulp.src([config.dest + 'css/*.css', '!' + config.dest + 'css/*.min.css'])
        .pipe(plugins.minifyCss({keepBreaks: true}))
        .pipe(plugins.rename(function (path) {
            path.extname = ".min.css";
        }))
        .pipe(gulp.dest(config.dest + 'css'))
});

gulp.task('css', ['scss', 'cssSprite', 'cssmin']);

gulp.task('html', function () {
    return gulp.src([config.src + '*.html', '!' + config.src + '_*.html'])
        .pipe(plugins.imports())
        .pipe(plugins.replace(/\?ver=[^\"]*/g, '?ver=' + config.version()))
        .pipe(gulp.dest(config.dest))
});


gulp.task('default', ['riot', 'js', 'css', 'html'], function () {
    // livereload.listen();
    gulp.watch([config.src + '**/*.scss'], ['css']);
    gulp.watch([config.src + 'tags/**/*.html', config.src + 'js/*.js', config.src + 'js/**/*.js'], ['js']);
    gulp.watch([config.src + '*.html'], ['html']);

    /*gulp.src([config.src + 'tags/*.*', config.src + 'js/*.*'])
        .pipe(doc({output: 'api.md'}))
        .pipe(gulp.dest(config.src + 'doc/'));*/
});