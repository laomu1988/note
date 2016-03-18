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