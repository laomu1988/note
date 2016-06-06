# nodejs代理工具hoxy的使用介绍
[Hoxy](https://github.com/greim/hoxy)是一个用Node编写的完全免费、开源的Http代理软件，类似Charles和Fiddler。 它有一下功能：
* 中断请求或者响应.
* 查看和修改请求或响应的各个部分
* 模拟慢速网络和延迟发送
* 支持正向或者反向代理
* 可以用本地文件代替远程请求
* 请求或者响应主体支持格式: JSON, string, jQuery, buffer, 等.
* 支持HTTP和HTTPS.

## 工作原理
> Hoxy是客户端和服务器端之间的一个代理工具，可以在请求或者响应阶段做任何处理。配置代理后，客户端发送的请求将经历一下五个阶段
```
time ==>
-----------------------
server:       3
-------------/-\-------
hoxy:       2   4
-----------/-----\-----
client:   1       5

```
1.客户端发送请求.
2.Hoxy拦截并处理请求.
3.服务器端收到请求并发送响应数据.
4.Hoxy拦截响应并处理.
5.客户端收到请求.


下面通过几个例子来了解下hoxy的使用
### 1.打印所有请求并中断请求，发送 helloworld 给客户端
```
"use strict";
let hoxy = require('hoxy');
// 创建一个代理服务器
let proxy = hoxy.createServer().listen(8080, function () {
    console.log('start server at port:', 8080);
});

// 在请求阶段拦截并修改
proxy.intercept('request', function (req, resp, cycle) {
    console.log('URL:', req.fullUrl());
    resp.statusCode = 200;
    resp.string = 'hello world!';
});
```
 现在你可以直接打开浏览器直接访问http://localhost:8080，或者配置代理地址为"你的ip:8080"，然后访问任意网页，即可看到"hello world!"
 假如只是想查看请求内容，不做任何处理，只需要将resp相关行注释掉即可。
 在请求阶段修改了响应内容之后，hoxy将不会再向服务器发送请求，直接使用修改后的内容发送给客户端。
### 2.修改请求或响应数据
```
// 省略前面创建代理服务器部分代码，以后示例同样
// 在请求阶段拦截并修改header
proxy.intercept({
    phase: 'request',
    hostname: 'test.com'
}, function (req, resp, cycle) {
    console.log('URL:', req.fullUrl());
    req.headers['host'] = 'test123.com';
});

// 在响应阶段拦截并修改响应数据
proxy.intercept({
    phase: 'response',
    fullUrl: /compconfig/, // 只修改匹配该正则的网址
    as: 'json'   // 将响应转化为json格式
}, function (req, resp, cycle) {
    console.log('URL:', req.fullUrl());
    if(resp.json.data){
        resp.json.data['test'] = '123';
    }
});
```
### 3.修改响应速度
```

// 限制上传速度为10,000字节/秒
proxy.intercept('request', function(req, resp, cycle) {
  req.slow({rate:10000}); // bytes per second
});

// 模拟每个请求延迟500到1000ms
proxy.intercept('request', function(req, resp, cycle) {
  req.slow({latency:randint(500, 1000)});
});
```

### 4.发送本地文件
```
// 拦截compconfig并发送本地文件
proxy.intercept({
    phase: 'request',
    fullUrl: /compconfig/,
}, function (req, resp, cycle) {
    console.log('URL:', req.fullUrl());
    resp.statusCode = 200;
    return cycle.server("./mock/compconfig.json"); // 注意一定要将该对象(是个promise)返回，否则发送文件将不会生效
});
```


### 5.https代理服务器
关于https和ssl证书，可以参考
* [科普：TLS、SSL、HTTPS以及证书](http://www.cnblogs.com/kyrios/p/tls-and-certificates.html)
* [node创建https服务器](http://blog.fens.me/nodejs-https-server/)
* [nodejs创建https服务器](http://blog.csdn.net/cwallow/article/details/14169663)
* [用Node.js创建自签名的HTTPS服务器](http://cnodejs.org/topic/54745ac22804a0997d38b32d)

在这里我们使用openssl工具创建证书
```
# 创建密匙
openssl genrsa -out ./ca/my-private-root-ca.key.pem 2048
# 创建证书，我们将用这个证书为所有通过该代理的网站制作签名证书
openssl req -x509 -new -nodes -key ./ca/my-private-root-ca.key.pem -days 1024 -out ./ca/my-private-root-ca.crt.pem -subj "/C=US/ST=Utah/L=Provo/O=ACME Signing Authority Inc/CN=example.com"
```

创建https代理服务器
```
hoxy.createServer({
  certAuthority: {
    key: fs.readFileSync('./ca/my-private-root-ca.key.pem'),
    cert: fs.readFileSync('./ca/my-private-root-ca.crt.pem')
  }
}).listen(8080);
```
配置好代理访问https://www.baidu.com，将提示改网站证书不可信。
这里需要我们先信任刚刚制作的证书“my-private-root-ca.crt.pem”，之后就可以正常访问了。。
可以结合示例4，匹配某一个地址就发送证书给浏览器，就可以像fiddle或charles一样监控手机的https请求了。


### 6.使用时遇到的问题
1. setheader失败程序退出。node4.2.6之后的版本setheader采用更严格的匹配模式比如setheader['host :www.baidu.com'],多个空格将不能正常执行。。
这时需要将node降为4.2.6版本或以下(可以使用node版本管理工具nvm或者n)
2. 出现错误时程序容易崩溃，比如链接失效等。可以使用domain或者process或者其他方式捕获异常后重启
 例如：node异常捕获domain
```
const domain = require('domain');
const fs = require('fs');
const d = domain.create();
d.on('error', (er) => {
    console.error('Caught error!', er);
});
d.run(() => {
    process.nextTick(() => {
        setTimeout(() => { // simulating some various async stuff
            fs.open('non-existent file', 'r', (er, fd) => {
                if (er) throw er;
                // proceed...
            });
        }, 100);
    });
});
```
