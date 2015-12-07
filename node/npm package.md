# 有用的npm包记录
* gulp-util gulp常用工具库
* gulp-uglify 压缩js文件
* gulp-concat 连接文件
* gulp-sourcemaps 处理js时,生成sourcemap
* gulp-less
* gulp-sass
* gulp-autoprefixer 自动补全浏览器兼容的css
* gulp-minify-css 压缩css
* del 删除文件夹
* gulp-nodemon自动重启服务器
* livereload 自动刷新页面
* browser-sync 静态文件服务器,支持自动刷新
* anywhere:小型静态服务器， 安装,然后使用命令行(anywhere -p 8000)在浏览器打开页面

* sendgrid 发送邮件
## 批量加载
* require-dir加载整个文件夹
```
var require_dir = require('require-dir');
require_dir('./gulp-tasks', {recurse: true});
```
* gulp-load-plugins 根据package自动加载gulp插件
```
var plugin = require('gulp-load-plugins')({
    pattern: ['gulp-*', 'gulp.*'],
    replaceString: /\bgulp[\-.]/
});
```
## 使用浏览器打开页面
* gulp-shell


## npm模块window下安装问题
* gulp-sass在window下安装时需要 Visual Studio 2013 WD版本，假如不确定版本号，可以使用  --msvs_version=2013指定编译版本
* nodegyp