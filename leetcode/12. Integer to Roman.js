/**
 * 将数字转换为罗马数
 *
 *
 *
 罗马数字共有7个，即I（1）、V（5）、X（10）、L（50）、C（100）、D（500）和M（1000）。按照下述的规则可以表示任意正整数。需要注意的是罗马数字中没有“0”，与进位制无关。一般认为罗马数字只用来记数，而不作演算。

 重复数次：一个罗马数字重复几次，就表示这个数的几倍。
 右加左减：
 在较大的罗马数字的右边记上较小的罗马数字，表示大数字加小数字。
 在较大的罗马数字的左边记上较小的罗马数字，表示大数字减小数字。
 左减的数字有限制，仅限于I、X、C。比如45不可以写成VL，只能是XLV
 但是，左减时不可跨越一个位值。比如，99不可以用IC（100 - 1）表示，而是用XCIX（[100 - 10] + [10 - 1]）表示。（等同于阿拉伯数字每位数字分别表示。）
 左减数字必须为一位，比如8写成VIII，而非IIX。
 右加数字不可连续超过三位，比如14写成XIV，而非XIIII。（见下方“数码限制”一项。）
 加线乘千：
 在罗马数字的上方加上一条横线或者加上下标的Ⅿ，表示将这个数乘以1000，即是原数的1000倍。
 同理，如果上方有两条横线，即是原数的1000000（1000^{2}）倍。
 数码限制：
 同一数码最多只能连续出现三次，如40不可表示为XXXX，而要表示为XL。
 例外：由于IV是古罗马神话主神朱庇特（即IVPITER，古罗马字母里没有J和U）的首字，因此有时用IIII代替IV。

 Given an integer, convert it to a roman numeral.
 Input is guaranteed to be within the range from 1 to 3999.
 * */


/**
 * @param {number} num
 * @return {string}
 */
var intToRoman = function(num) {
    if(num === 4){
        return 'IIII';
    }
    var str = '',n1 = num % 10,n2 = Math.floor(num%100/10),n3 = Math.floor(num % 1000/100),n4 = Math.floor(num/1000);
    while(n4-- > 0){
        str += 'M';
    }
    if(n3 > 0){
        switch(n3){
            case 1:str += 'C';break;
            case 2:str += 'CC';break;
            case 3:str += 'CCC';break;
            case 4:str += 'CD';break;
            case 5:str += 'D';break;
            case 6:str += 'DC';break;
            case 7:str += 'DCC';break;
            case 8:str += 'DCCC';break;
            case 9:str += 'CM';break;
        }
    }
    if(n2 > 0){
        switch(n2){
            case 1:str += 'X';break;
            case 2:str += 'XX';break;
            case 3:str += 'XXX';break;
            case 4:str += 'XL';break;
            case 5:str += 'L';break;
            case 6:str += 'LX';break;
            case 7:str += 'LXX';break;
            case 8:str += 'LXXX';break;
            case 9:str += 'XC';break;
        }
    }
    if(n1 > 0){
        switch(n1){
            case 1:str += 'I';break;
            case 2:str += 'II';break;
            case 3:str += 'III';break;
            case 4:str += 'IV';break;
            case 5:str += 'V';break;
            case 6:str += 'VI';break;
            case 7:str += 'VII';break;
            case 8:str += 'VIII';break;
            case 9:str += 'IX';break;
        }
    }
    return str;
};