


var express = require('express');
var request = require('request');
var app = express();
app.enable('trust proxy');

// 输出日志
app.use(function (req, res, next) {
    console.log(new Date() + req.url);
    next();
});
// 代理配置文件
app.use('/proxy.pac', express.static(__dirname + '/proxy.js'));
app.use('/proxy.js', express.static(__dirname + '/proxy.js'));

app.use('/ask/', express.static(__dirname + '/dest/'));


// 未找到的文件自动转发原地址
app.use(function (req, res) {
    console.log('this request need proxy；')
    switch(req.method){
        case 'GET':
            req.pipe(request(req.url)).pipe(res);
            break;
        case 'POST':
            req.pipe(request.post(req.url, {form:req.body})).pipe(res);
            break;
        default:
            console.log(req.method);
    }
});

app.listen(3000, function () {
    console.log('start local server for ask');
});