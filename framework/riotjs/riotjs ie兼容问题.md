# 在IE8中书写注意
* {"classname": a > b} 这种结构,类名称可以带引号,其他{}标签中,不能带有引号

* dom.outerHTML 适用与IE9+浏览器，不兼容ie8

* riot循环中的子模板在ie8下会出问题: 解决方法：mount之后，获取[riot-tag]并且inlineHTML为空的节点手动mount一次