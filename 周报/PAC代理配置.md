# [PAC代理配置](http://blog.csdn.net/xundh/article/details/48193369)
* 主要函数 FindProxyForURL
```
    function FindProxyForURL(url,host)
    {
        // 支持javascript，可以使用正则表达式进行处理
        if(host=="http://www.domain.com/") return "DIRECT";
        return "PROXY myproxy:80;PROXY myotherproxy:8080;DIRECT";

    }
```

* 返回值
    - "DIRECT" : 不做处理，直接返回
    - "PROXY host:port" 发送到代理服务地址
    - "PROXY host:port;host:port;DIRECT"  多个代理服务地址，自动按顺序请求


* 其他函数
    - isPlainHostName(host) 判断是否是本地主机
    - dnsDomainIs(host,domain) 判断是否属于某个域
    - localHostOrDomainls(host,"") 判断是否属于某个域或者域名
    - shExpMatch(host,"") 主机名匹配判断
    - url.substring(0,n)
    - dnsResolve(host) 域名ip解析
    - myIpAddress() 本机ip
    - dnsDomainLevels(host)
    - weekdayRange("WED","SAT","GMT") 星期几


# 示例：匹配test.com到localhost:3000
```
function FindProxyForURL(url, host) {
    if (shExpMatch(host, '*.test.com*')) {
        return "PROXY localhost:3000";
    }

    // 或者使用正则表达式
    if (/test\.com/.test(host)){
        return "PROXY localhost:3000";
    }

    return "DIRECT";
}
```