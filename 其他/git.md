# git使用

* git config --global user.name "wirelessqa"
* git config --global user.email wirelessqa.me@gmail.com


* push失败，failed to connect to github port 443: timed out
删除用户名，密码，代理
删除代理
git config --unset  (--global) http.proxy


# gitignore
```
/dest/*
!/dest/css/  #不忽略文件
```

* 假如已经有内容加入到git中，再添加到gitignore将不起作用