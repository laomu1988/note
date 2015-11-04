## 读 css Secrets 笔记

# 介绍
* 模块化和扩展性，例如采用相对高度，背景透明度
* 相信眼睛，而不是相信数字
  * 垂直居中时，看起来总是偏下，可以向上调一下
  * 圆和矩形同样大小，看起来圆总是偏小，可以适当调大
  * 内间距上下间距比左右看起来大

# 背景和边框
  * 半透明边框颜色和背景颜色相同时，半透明边框不起作用：背景颜色边界 background-clip
  * 多个border: outline shadow
  * 背景位置: background-position: right 10px bottom 20px; background-origin,calc()
  * 外方内圆角: outline实现外方,border-radius实现内圆,box-shadow填充中间空白部分
  * 条纹背景: background:linear-gradient(#fb3,#58a)
  * 垂直条纹,倾斜条纹,三角格子.多套背景background-position: 0 0, 15px 15px;
  
