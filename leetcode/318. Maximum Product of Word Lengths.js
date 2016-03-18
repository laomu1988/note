/*
 Given a string array words, find the maximum value of length(word[i]) * length(word[j]) where the two words do not share common letters. You may assume that each word will contain only lower case letters. If no such two words exist, return 0.

 Example 1:
 Given ["abcw", "baz", "foo", "bar", "xtfn", "abcdef"]
 Return 16
 The two words can be "abcw", "xtfn".

 Example 2:
 Given ["a", "ab", "abc", "d", "cd", "bcd", "abcd"]
 Return 4
 The two words can be "ab", "cd".

 Example 3:
 Given ["a", "aa", "aaa", "aaaa"]
 Return 0
 No such pair of words.


 计算要求：两个字符串没有相同的自负
 */


/**
 * @param {string[]} words
 * @return {number}
 */
var maxProduct = function (words) {
    var n2 = [1, 2, 4, 8], wordSign = [], cal = 0;
    for (var i = 2; i <= 26; i++) {
        n2[i] = n2[i - 1] * 2;
    }
    var sign1 = '', val1 = 0, sign2 = '', val2 = 0;
    for (var i = words.length - 1; i >= 0; i--) {
        var sign = 0, word = words[i];
        for (var j = word.length - 1; j >= 0; j--) {
            sign &= n2[word.charCodeAt(j)];
        }
        wordSign[sign] = wordSign[sign] > word.length ? wordSign[sign] : word.length;
    }
    for (var attr in wordSign) {
        for (var attr2 in wordSign) {
            if (attr & attr2 === 0) {
                var cal2 = wordSign[attr] * wordSign[attr2];
                cal2 > cal ? cal = cal2 : null;
            }
        }
    }
    return cal;
};