/**验证常用内容的速速快慢
 * parseInt和Math.floor
 *
 * while,for,forEach,every
 * */

// 比较parseInt和Math.floor
var a = '10000.1', i = 0, b;

i = 0;
console.time('parseInt');
while (i++ < 10000000) {
    b = parseInt(a);
}

console.timeEnd('parseInt');

i = 0;
console.time('floor');
while (i++ < 10000000) {
    b = Math.floor(a);
}
console.timeEnd('floor');
/**结论：转换数字的话 Math.floor速度可能为稍快（和运行环境有关），转换字符串的话parseInt稍快*/

i = 0;
arr = [];
while (i < 1000000) {
    arr[i++] = 0;
}
console.time('while');
while (i++ < 1000000) {
    b = arr[i];
}
console.timeEnd('while');

i = 0;
console.time('for');
for (i = 0; i < 1000000; i++) {
    b = arr[i];
}
console.timeEnd('for');

console.time('forEach');
arr.forEach(function (n) {
    b = n;
});
console.timeEnd('forEach');
