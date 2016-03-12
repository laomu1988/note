/**
 Given an array nums containing n + 1 integers where each integer is between 1 and n (inclusive), prove that at least one duplicate number must exist. Assume that there is only one duplicate number, find the duplicate one.

 Note:
 You must not modify the array (assume the array is read only).
 You must use only constant, O(1) extra space.
 Your runtime complexity should be less than O(n2).
 There is only one duplicate number in the array, but it could be repeated more than once.



 http://www.cnblogs.com/grandyang/p/4843654.html
 这道题给了我们n+1个数，所有的数都在[1, n]区域内，首先让我们证明必定会有一个重复数，这不禁让我想起了小学华罗庚奥数中的抽屉原理(又叫鸽巢原理), 即如果有十个苹果放到九个抽屉里，如果苹果全在抽屉里，则至少有一个抽屉里有两个苹果，这里就不证明了，直接来做题吧。题目要求我们不能改变原数组，即不能给原数组排序，又不能用多余空间，那么哈希表神马的也就不用考虑了，又说时间小于O(n2)，也就不能用brute force的方法，那我们也就只能考虑用二分搜索法了，我们在区别[1, n]中搜索，首先求出中点mid，然后遍历整个数组，统计所有小于等于mid的数的个数，如果个数大于mid，则说明重复值在[mid+1, n]之间，反之，重复值应在[1, mid-1]之间，然后依次类推，直到搜索完成，此时的low就是我们要求的重复值，参见代码如下：
 */


/**
 * @param {number[]} nums
 * @return {number}
 */
var findDuplicate = function (nums) {
    var start = 1, end = nums.length - 1;
    while (start < end) {
        var mid = (end + start ) / 2, count = 0;

        console.log('before',start, end, mid, count, (end - start) / 2 + 1);
        for (var i = nums.length - 1; i >= 0; i--) {
            var n = nums[i];
            if (n >= start && n <= end && n >= mid) {
                count += 1;
            }
        }
        if (count > (end - start) / 2 + 1) {
            start = Math.round(mid + 0.49999);
        } else {
            end = Math.round(mid - 0.49999);
        }
        console.log('after',start, end, mid, count, (end - start) / 2 + 1);
    }
    return start;
};
console.log(findDuplicate([1,5,5,6,2,8,4,7,5,5]));
console.log(findDuplicate([8,1,1,1,2,7,4,3,1,1]));
console.log(findDuplicate([1,2,3,4,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]));