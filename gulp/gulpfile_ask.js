var requireDir = require('require-dir');
var gulp = require('gulp');
var shell = require('gulp-shell');
/*var load = require('gulp-load-plugins')({
    pattern: ['gulp-*', 'gulp.*'],
    replaceString: /\bgulp[\-.]/
});*/


global.gl = global.gl || {};

requireDir('./gulp-tasks', {recurse: true});

gulp.task('open',function(){
    gulp.src('').pipe(shell('anywhere -p 8000'));
});

gulp.task('default', ['dev']);
/*
var livereload = require('livereload');
server = livereload.createServer({
    originalPath: "http://172.22.231.50:8000"
});
server.watch(['./js','./css']);*/