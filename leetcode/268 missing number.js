/**Given an array containing n distinct numbers taken from 0, 1, 2, ..., n, find the one that is missing from the array.

 For example,
 Given nums = [0, 1, 3] return 2.

 Note:
 Your algorithm should run in linear runtime complexity. Could you implement it using only constant extra space complexity?

 找到漏掉的数
 */


/**
 * @param {number[]} nums
 * @return {number}
 */
var missingNumber = function (nums) {
    var len = nums.length, sum = len * (len + 1) / 2;
    nums.forEach(function (n) {
        sum -= n;
    });
    return sum;
};