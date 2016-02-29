return;

var gulp = require('gulp');
var unbrokenDoc = require('unbroken-doc');

unbrokenDoc.init('new-ask-1.1');

gulp.task('doc', unbrokenDoc.tasks.doc);
gulp.task('validate', unbrokenDoc.tasks.validate);