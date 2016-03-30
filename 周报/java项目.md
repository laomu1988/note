

# java项目内搜本地部署
* 安装jdk1.7
* 安装mysq
* 导入数据库
* 配置Run-Edit Configurations

# 系统
    * 修改数据库密码 src\main\resources\app.properties

# 提交代码(技巧:先检查再合并)
    * 合并代码Terminal
        * cd webapp\neisou\build
        * node r.js -o config.js
    * 检查代码，提交到cooder，查看地址cooder.baidu.com
        * cd neisouweb\
        * python ./upload.py -o
    * 修改版本号：src/main/webapp/WEB-INF/jsp/include/meta.jsp 修改ver（版本号）以及contextPath（调用代码路径：neisou->ns）的值
    * 检查无误后提交到vpn，通过demo.neisou.baidu.com