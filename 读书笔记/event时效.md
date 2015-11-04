# event事件参数时效性
    如下代码,在触发事件后,我们进行了其他操作,比如ajax和setTimeout等,过段时间,虽然还是同一个变量,但是其中的currentTaget就不见了.假如要延迟使用currentTarget属性,必须先存储下来,避免被消除掉.
```
     function mouseclick(e){
        console.log(e.currentTarget);
        //ajax setTimeout等
        setTimeout(function(){
           console.log(e.currentTarget);
        },1000);
     }
```