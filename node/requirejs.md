# requirejs

* baseUrl优先级高于data-main
* .js结束,/开始，包含http:，https 将不使用baseUrl


# config
```
require.config({
    urlArgs:'_v='+'@@timestamp' // 添加时间戳
    baseUrl:
});
```

# r.js打包
* 避免循环依赖
* 避免打包： 