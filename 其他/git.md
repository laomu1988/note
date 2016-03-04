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




# git errors
```
error: RPC failed; result=22, HTTP code = 411
fatal: The remote end hung up unexpectedly
fatal: The remote end hung up unexpectedly
Everything up-to-date




If you attempt to push a large set of changes to a Git repository with HTTP or HTTPS, you may get an error message such as error: RPC failed; result=22, HTTP code = 411. This is caused by a Git configuration default which limits certain HTTP operations to 1 megabyte.

To change this limit run within your local repository

git config http.postBuffer *bytes*
where bytes is the maximum number of bytes permitted. For exmaple:

git config http.postBuffer 524288000
For 500MB (thanks @Hengjie)


```