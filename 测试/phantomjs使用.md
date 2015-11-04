# 使用phantomjs进行前端测试
* 下载文件
* 设置执行文件到环境变量path

## Hello World!
1.创建hello.js
```javascript
console.log('Hello, world!');
phantom.exit(); //终止phantom程序
```
2.执行命令 phantomjs hello.js


## 下载页面并保存页面渲染图
```javascript
var page = require('webpage').create();
page.open('http://example.com', function(status) {
  console.log("Status: " + status);
  if(status === "success") {
    page.render('example.png');
  }
  phantom.exit();
});
```

## 下载速度
```javascript
var page = require('webpage').create(),
system = require('system'),
t,address;
console.log(system.args);
if(system.args.length === 1){
    console.log('Usage: loadspeed.js <some url>');
    phantom.exit();
}
t = Date.now();
address = system.args[1];
page.open(address,function(status){
   if(status !== 'success'){
   console.log('Fail to load the address');
   } else{
   t = Date.now() - t;
   console.log('Loading '+ system.args[1]);
   console.log('loading time ' + t + 'msec.');
   }
   phantom.exit();
});
```
## 代码执行
在页面上执行代码需要使用evaluate函数,这是个沙箱函数,不能获取页面上的js对象.

