# cheerio使用
```javascript
var cheerio = require('cheerio');
var $ = cheerio.load('<div class="test"><span class="a"></span></div>');
// 查找
var a = $('.a');
// 设置节点属性
a.attr('test','testval');
// 输出节点名称
console.log(a[0].name);
// 获取节点内容
console.log(a.html());
// 删除
a.remove();
```
# $属性
```
fn
load()
html()
xml()
text()
parseHTML()
root()
contains()
_root
_options
```

# 节点属性
```
options
length
_root
constructor()
_originalRoot
cheerio
splice()
_make()
toArray()
attr()
data()
val()
removeAttr()
hasClass()
addClass()
removeClass()
toggleClass()
is()
find()
parent()
parents()
parentsUntil()
closest()
next()
nextAll()
nextUntil()
prev()
prevAll()
prevUntil()
siblings()
children()
contents()
each()
map()
filter()
not()
has()
first()
last()
eq()
get()
index()
slice()
end()
add()
addBack()
_makeDomArray()
append()
prepend()
after()
insertAfter()
before()
insertBefore()
remove()
replaceWith()
empty()
html()
toString()
text()
clone()
css()
serializeArray()
```
# 节点内容属性 a[0].name
```
{ '0':
   { type: 'tag',
     name: 'a',
     attribs: {},
     children: [ [Object] ],
     next: null,
     prev: null,
     parent:
      { type: 'tag',
        name: 'test',
        attribs: {},
        children: [Object],
        next: null,
        prev: null,
        parent: null,
        root: [Object]
      }
   }
}
```