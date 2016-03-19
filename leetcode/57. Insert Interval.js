/*
 Given a set of non-overlapping intervals, insert a new interval into the intervals (merge if necessary).

 You may assume that the intervals were initially sorted according to their start times.

 Example 1:
 Given intervals [1,3],[6,9], insert and merge [2,5] in as [1,5],[6,9].

 Example 2:
 Given [1,2],[3,5],[6,7],[8,10],[12,16], insert and merge [4,9] in as [1,2],[3,10],[12,16].

 This is because the new interval [4,9] overlaps with [3,5],[6,7],[8,10].
 *
 * */


/**
 * Definition for an interval.
 * function Interval(start, end) {
 *     this.start = start;
 *     this.end = end;
 * }
 */
/**
 * @param {Interval[]} intervals
 * @param {Interval} newInterval
 * @return {Interval[]}
 */
var insert = function (intervals, newInterval) {
    var len = intervals.length;
    if (len === 0) {
        intervals.push(newInterval);
    }
    else if (newInterval.start > intervals[len - 1].end) {
        intervals.push(newInterval);
    } else if (newInterval.end < intervals[0].start) {
        intervals.unshift(newInterval);
    } else {
        var start = newInterval.start, end = newInterval.end, hasOver = false;
        for (var i = 0; i < intervals.length; i++) {
            if (end >= intervals[i].start && intervals[i].end >= start) {
                // 判断存在交集
                if (hasOver) {
                    // 和前面一个已经存在交集过
                    if (intervals[i].end > end) {
                        end = intervals[i - 1].end = intervals[i].end;
                    }
                    intervals.splice(i, 1);
                    i -= 1;
                } else {
                    if (intervals[i].start > start) {
                        intervals[i].start = start;
                    }
                    if (intervals[i].end < end) {
                        intervals[i].end = end;
                    } else {
                        end = intervals[i].end;
                    }
                }
                hasOver = true;

            } else if (hasOver) {
                return intervals;
            } else if (end < intervals[i].start) {
                // 在两个interval中间
                intervals.splice(i, 0, newInterval);
                return intervals;
            }
        }
    }

    return intervals;
};
console.log(insert([{start: 1, end: 5}, {start: 8, end: 10}, {start: 20, end: 30}], {start: -10, end: -10}));
console.log(insert([{start: 1, end: 5}, {start: 8, end: 10}, {start: 20, end: 30}], {start: -2, end: 1}));
console.log(insert([{start: 1, end: 5}, {start: 8, end: 10}, {start: 20, end: 30}], {start: 1, end: 1}));
console.log(insert([{start: 1, end: 5}, {start: 8, end: 10}, {start: 20, end: 30}], {start: 1, end: 2}));
console.log(insert([{start: 1, end: 5}, {start: 8, end: 10}, {start: 20, end: 30}], {start: 1, end: 20}));
console.log(insert([{start: 1, end: 5}, {start: 8, end: 10}, {start: 20, end: 30}], {start: 11, end: 20}));
console.log(insert([{start: 1, end: 5}, {start: 8, end: 10}, {start: 20, end: 30}], {start: 11, end: 11}));