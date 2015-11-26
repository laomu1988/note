# 使用riot时遇到的坑

## 尽量使用数据,然后调用update更新,而不是手动修改节点结构
* array数组展示节点,手动修改了渲染后的结构,更新节点时不起作用. 原因:手动修改使得节点和数据关联失效.

## 调用子模块时参数中直接使用函数.最好通过js更新数据后update,而不是在模板中使用函数。
* 例如这种结构.<parent><child html={before(html)} test="{test}"></child></parent>,在child中的opts.html将为空,数据还未计算
