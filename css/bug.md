#bug及解决方法

* firfox 不支持background-position-x/y，最好使用background-position设置背景图


#CSS
  * [div多余高度](http://frontpage.sinaapp.com/testfooter3.html)
    * div内包含inline-block类型空元素时，div总是比内部元素高3px，当div是页面最下方元素时，即使固定div高度，其下方也会多3px。解决办法：将div的overflow设置为hidden
    * div内包含img时，div可能会比img高度高3px。解决办法：设置img的block元素或者vertical-align:middle;
