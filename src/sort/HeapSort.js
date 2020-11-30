import Sort from "./Sort";
import Color from "./Color";

class HeapSort extends Sort {
    sort = () => {
        this.constructHeap(this.elements, (this.elements.length >> 1) - 1, () => this.heapSort(this.elements, this.elements.length - 1))
    }

    constructHeap = (arr, cur, cb) => {
        if (cur < 0) {
            this.handler(arr);
            setTimeout(() => cb(), this.delay);
            return;
        }
        const left = (cur << 1) + 1;
        const right = left + 1;
        this.downHeap(arr, arr[cur].height, cur, left, right, arr.length, () => this.constructHeap(arr, cur - 1, cb));
    }

    heapSort = (arr, end) => {
        if (end <= 0) {
            this.handler(arr);
            return;
        }
        [arr[0], arr[end]] = [arr[end], arr[0]];
        arr[0].color = arr[end].color = Color.RED;
        this.handler(arr);
        arr[0].color = arr[end].color = Color.WHITE;
        this.downHeap(arr, arr[0].height, 0, 1, 2, end, () => this.heapSort(arr, end - 1));
    }

    downHeap = (arr, data, here, left, right, length, cb) => {
        if (left >= length) {
            arr[here].color = Color.GREEN;
            arr[here].height = data;
            this.handler(arr);
            arr[here].color = Color.WHITE;
            setTimeout(() => cb(), this.delay);
            return;
        }
        let cmpIdx;
        if (left === length - 1) {
            cmpIdx = left;
        } else if (arr[left].height > arr[right].height) {
            cmpIdx = left;
        } else {
            cmpIdx = right;
        }
        if (data > arr[cmpIdx].height) {
            arr[here].color = Color.GREEN;
            arr[here].height = data;
            this.handler(arr);
            arr[here].color = Color.WHITE;
            setTimeout(() => cb(), this.delay);
            return;
        }
        arr[here].height = arr[cmpIdx].height;
        arr[here].color = arr[cmpIdx].color = Color.GREEN;
        this.handler(arr);
        arr[here].color = arr[cmpIdx].color = Color.WHITE;
        setTimeout(() => this.downHeap(arr, data, cmpIdx, (cmpIdx << 1) + 1, (cmpIdx << 1) + 2, length, cb), this.delay);
    }
}

export default HeapSort;