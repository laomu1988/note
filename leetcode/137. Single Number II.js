/*
 * Given an array of integers, every element appears three times except for one. Find that single one.

 Note:
 Your algorithm should have a linear runtime complexity. Could you implement it without using extra memory?

 Subscribe to see which companies asked this question

 Show Tags
 Show Similar Problems
 Have you met this question in a real interview? Yes  No
 Discuss

 *
 * */
/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function (nums) {
    var arr1 = [], arr2 = [], len = nums.length, result = 0;
    for (var i = 0; i < 64; i++) {
        arr1[i] = arr2[i] = 0;
    }
    for (i = 0; i < len; i++) {
        var n = nums[i], sign = 0;
        if (n >= 0) {
            while (n > 0) {
                if ((n & 1) === 1) {
                    arr1[sign] += 1;
                }
                sign += 1;
                n = Math.floor(n / 2);
            }
        } else {
            n = -n;
            console.log(n);
            while (n > 0) {
                if ((n & 1) === 1) {
                    console.log(sign, n);
                    arr2[sign] += 1;
                }
                sign += 1;
                n = Math.floor(n / 2);
            }
        }
    }
    console.log(arr1.join(','));
    console.log(arr2.join(','));
    var sign = 1;
    for (var i = 0; i < 64; i++) {
        result += ((arr1[i] % 3) - (arr2[i] % 3)) * sign;
        sign *= 2;
    }
    console.log(result);
    return result;
};
//singleNumber([-2147483648]);
singleNumber([-401451, -177656, -2147483646, -473874, -814645, -2147483646, -852036, -457533, -401451, -473874, -401451, -216555, -917279, -457533, -852036, -457533, -177656, -2147483646, -177656, -917279, -473874, -852036, -917279, -216555, -814645, 2147483645, -2147483648, 2147483645, -814645, 2147483645, -216555]);