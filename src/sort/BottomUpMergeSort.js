import Sort from "./Sort";
import Color from "./Color";

class BottomUpMergeSort extends Sort {
    sort = () => {
        const newArr = [];
        for (const e of this.elements) {
            newArr.push(e.height);
        }
        this.mergeSort(this.elements, newArr, 1);
    }

    mergeSort = (arr, newArr, size) => {
        if (size >= arr.length) {
            this.handler(arr);
            return;
        }
        this.bottomUp(arr, newArr, 0, size);
    }

    bottomUp = (arr, newArr, left, size) => {
        if (left >= arr.length) {
            this.handler(arr);
            this.registerCallback(() => this.mergeSort(arr, newArr, size * 2));
            return;
        }
        this.merge(arr, newArr, left, left + size - 1, Math.min(left + size * 2 - 1, arr.length - 1), size);
    }

    merge = (arr, newArr, left, mid, right, size) => {
        let i = left;
        let j = mid + 1;
        let k = left;

        while (i <= mid && j <= right) {
            if (arr[i].height < arr[j].height) {
                newArr[k++] = arr[i++].height;
            } else {
                newArr[k++] = arr[j++].height;
            }
        }

        while (i < arr.length && i <= mid) {
            newArr[k++] = arr[i++].height;
        }
        this.apply(arr, newArr, left, left, right, size);
    }

    apply = (arr, newArr, current, left, right, size) => {
        if (current > right) {
            this.handler(arr);
            this.registerCallback(() => this.bottomUp(arr, newArr, left + size * 2, size));
            return;
        }
        arr[current].height = newArr[current];
        arr[current].color = Color.RED;
        this.handler(arr);
        arr[current].color = Color.WHITE;
        this.registerCallback(() => this.apply(arr, newArr, current + 1, left, right, size));
    }

}

export default BottomUpMergeSort;