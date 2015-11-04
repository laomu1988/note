# zrender: 轻量级的canvas类库,MVC核心封装实现图形仓库、视图渲染和交互控制       
* Stroage(M) : shape数据CURD管理
* Painter(V) : canvase元素生命周期管理，视图渲染，绘画，更新控制
* Handler(C) : 事件交互处理，实现完整dom事件模拟封装
* shape : 图形实体，分而治之的图形策略，可定义扩展
* tool : 绘画扩展相关实用方法，工具及脚手架
* animation : 动画扩展，提供promise式的动画接口和常用缓动函数
# 简单例子
```javascript
require.config({
    packages: [
        {
            name: 'zrender',
            location: '../src',
            main: 'zrender'
        }
    ]
});
require(
    [
        "zrender",
        "zrender/animation/animation",
        "zrender/shape/Circle"
    ],
    function (zrender, Animation, CircleShape) {
        var zr = zrender.init(document.getElementById("paint"));
        var circle = new CircleShape({
            position: [100, 100],
            scale: [1, 1],
            style: {
                x: 0,
                y: 0,
                r: 50,
                brushType: "fill",
                color: 'rgba(33,222,10,0.4)',
                lineWidth: 6,
                text: 'circle',
                textPosition: 'inside'
            },
            draggable: true
        });
        zr.addShape(circle);
        zr.render();
    }
)

```

# storage
# handle 事件交互处理，实现完整dom事件模拟封装
```javascript
var circle = new CircleShape({
    // draggable: true,
    // hoverable: false,
    // clickable : true,
    onmouseover: function () {
        console.log('mouse over');
    },
    onmouseenter: function () {
        /*不存在onmouseenter事件,可以根据onmouseover实现*/
        console.log('onmouseenter');
    },
    onmouseout: function () {
        console.log('mouse out', this);
    },
    onclick: function () {
        console.log('on click');
    }
});
```