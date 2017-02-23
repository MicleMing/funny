/**
 * @file 插入排序
 * @author lanmingming
 * @deco 先将序列的第1个记录看成是一个有序的子序列，然后从第2个记录逐个进行插入，直至整个序列有序为止
 */

function insertSort(arr) {
    let len = arr.length;
    for (var i = 0; i < len; i++) {
        if (arr[i] > arr[i + 1]) {
            var item = arr[i + 1];
            var j = i;
            while (item < arr[j]) {
                arr[j + 1] = arr[j];
                j--;
            }
            arr[++j] = item;
        }
    }

}

var arr = [2, 4, 6, 2, 3, 1, 7, 7];

insertSort(arr);

console.log(arr);

