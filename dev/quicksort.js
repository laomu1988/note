/**实现快速排序*/

var arr = [1, 3, 2, 8, 9, 5, 7, 3, 2, 10];
quicksort(arr);
function quicksort(arr) {
    sort(arr, 0, arr.length - 1);
    console.log(arr);
}
function sort(arr, start, end) {
    if (start >= end) {
        return false;
    }
    var key = arr[start], left = start, right = end;
    while (left < right) {
        if (arr[right] < key) {
            arr[left] = arr[right];
            arr[right] = key;
            left += 1;
            while (left < right) {
                if (arr[left] > key) {
                    arr[right] = arr[left];
                    arr[left] = key;
                    right -= 1;
                    break;
                }
                left += 1;
            }
        } else {
            right -= 1;
        }
    }
    sort(arr, start, left - 1);
    sort(arr, left + 1, end);
}

function quickSort(array) {
    function sort(prev, numsize) {
        var nonius = prev;
        var j = numsize - 1;
        var flag = array[prev];
        if ((numsize - prev) > 1) {
            while (nonius < j) {
                for (; nonius < j; j--) {
                    if (array[j] < flag) {
                        array[nonius++] = array[j];　//a[i] = a[j]; i += 1;
                        break;
                    }
                }
                for (; nonius < j; nonius++) {
                    if (array[nonius] > flag) {
                        array[j--] = array[nonius];
                        break;
                    }
                }
            }
            array[nonius] = flag;
            sort(0, nonius);
            sort(nonius + 1, numsize);
        }
    }

    sort(0, array.length);
    return array;
}