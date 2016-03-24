/**
 * 可以使用proxy-static
 * */

var request = require('request');
var path = require('path');
var url = require('url');
var fs = require('fs');

var src = 'http://dev.list.leanapp.cn/api/project/list?finished=false&removed=false';

console.log(url.parse(src));

var fileName = 'test.json';

// 直接请求并且写入文件
request(src).pipe(fs.createWriteStream(fileName));
request(src, function (error, response, body) {
    if (response.statusCode == 201) {
        console.log('document saved as: http://mikeal.iriscouch.com/testjs/' + rand)
    } else {
        console.log('error: ' + response.statusCode)
        console.log(body)
    }
}).pipe(fs.createWriteStream(fileName));