/**
 * Given a collection of intervals, merge all overlapping intervals.

 For example,
 Given [1,3],[2,6],[8,10],[15,18],
 return [1,6],[8,10],[15,18].

 given [[1,4],[1,4]]
 return [1,4]
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
 * @return {Interval[]}
 */
var merge = function (intervals) {
    if (intervals && intervals.length > 1) {
        for (var i = intervals.length - 1; i > 0; i--) {
            // 判断是否存在交集
            if ((intervals[i].start <= intervals[i - 1].end) && (intervals[i].end >= intervals[i - 1].start)) {
                if (intervals[i].end > intervals[i - 1].end) {
                    intervals[i - 1].end = intervals[i].end;
                }
                if (intervals[i].start <= intervals[i - 1].start) {
                    intervals[i - 1].start = intervals[i].start;
                }
                intervals.splice(i, 1);
                ///i++;
                if (i < intervals.length) {
                    // 从前面一个开始继续
                    i++;
                }
            } else if (intervals[i].end <= intervals[i - 1].start) {
                // 后面的线段在前面之前
                var start = intervals[i].start, end = intervals[i].end;
                intervals[i].start = intervals[i - 1].start;
                intervals[i].end = intervals[i - 1].end;
                intervals[i - 1].start = start;
                intervals[i - 1].end = end;
                i += 2;// 从前面一个开始继续
                if (i > intervals.length) {
                    i = intervals.length;
                }
            }
        }
    }
    console.log(intervals);
    return intervals;
};


// merge([{start: 1, end: 4}, {start: 1, end: 4}]);
//merge([{start: 1, end: 4}, {start: 0, end: 2}, {start: 3, end: 5}]);
//merge([{start: 1, end: 4}, {start: 0, end: 4}]);
merge([{start: 2, end: 3}, {start: 5, end: 5}, {start: 2, end: 2}, {start: 3, end: 4}, {start: 3, end: 4}]);

//merge([{start: 2, end: 3}, {start: 4, end: 4}, {start: 2, end: 2}, {start: 7, end: 7}]);

merge([{start: 1, end: 4}, {start: 0, end: 0}]);
merge([{start: 0, end: 0}, {start: -1, end: 0}, {start: 1, end: 4}]);
merge([{start: 1, end: 4}, {start: 0, end: 4}, {start: 5, end: 9}, {start: 1, end: 9}, {start: 30, end: 55}]);