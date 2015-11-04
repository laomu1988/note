# casper使用
* 安装phantomjs v2.0
* 下载casperjs v1.0.4,设置casperjs\batchbin到环境变量path
* 错误:Couldn’t find nor compute phantom.casperPath, exiting; 在bin\bootstrap.js中加上代码
```js
var system = require('system');
var argsdeprecated = system.args;
argsdeprecated.shift();
phantom.args = argsdeprecated;
```
* 输出中文乱码问题,添加代码: phantom.outputEncoding="GBK";