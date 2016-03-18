/**
 * Given an array of numbers nums, in which exactly two elements appear only once and all the other elements appear exactly twice. Find the two elements that appear only once.

 For example:

 Given nums = [1, 2, 1, 3, 2, 5], return [3, 5].

 Note:
 The order of the result is not important. So in the above example, [5, 3] is also correct.
 Your algorithm should run in linear runtime complexity. Could you implement it using only constant space complexity?

 */
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var singleNumber = function (nums) {
    var result1 = 0, result2 = 0, result = 0, sign = 0, len = nums.length;
    for (var i = 0; i < len; i++) {
        result ^= nums[i];
    }
    //console.log('result:', result);
    while ((result & 1) !== 1) {
        result = result >> 1;
        sign += 1;
    }
    //console.log('sign:', sign);
    sign = 1 << sign;
    //console.log('sign2:', sign);

    for (i = 0; i < len; i++) {
        if (nums[i] & sign) {
            result1 ^= nums[i];
        } else {
            result2 ^= nums[i];
        }
    }
    return [result1, result2];
};


singleNumber([1, 2, 3, 4, 4, 3, 2, 10, 1, 200, 10, 200, 2000, 2000, 20000, 200002323]);