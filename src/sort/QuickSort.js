import Sort from "./Sort";
import Color from "./Color";

class QuickSort extends Sort {
    sort = () => {
        this.quickSort(this.elements, 0, this.elements.length - 1);
    }

    quickSort = (arr, left, right) => {
        if (left >= right) {
            this.handler(arr);
            return;
        }
        this.position(arr, left, right, left, right, arr[left].height);
    }

    position = (arr, left, right, i, j, pivot) => {
        if (i >= j) {
            arr[left].height = arr[j].height;
            arr[j].height = pivot;
            arr[left].color = arr[j].color = Color.RED;
            this.handler(arr);
            arr[left].color = arr[j].color = Color.WHITE;
            setTimeout(() => this.quickSort(arr, left, j - 1), this.delay);
            setTimeout(() => this.quickSort(arr, j + 1, right), this.delay);
            return;
        }
        while (arr[j].height > pivot) j--;
        while (i < j && arr[i].height <= pivot) i++;
        const temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
        arr[i].color = arr[j].color = Color.RED;
        this.handler(arr);
        arr[i].color = arr[j].color = Color.WHITE;
        setTimeout(() => this.position(arr, left, right, i, j, pivot), this.delay);
    }

    /*QuickSort = (delay, length) => {
        let timeidx = 0;
        const heightList = this.state.heightList.slice();
        const quickSort = (arr, left, right) => {
            if (left < right) {
                const i = position(arr, left, right, timeidx++);
                quickSort(arr, left, i - 1);
                quickSort(arr, i + 1, right);
            }
            return arr;
        };

        const position = (arr, left, right, timei) => {
            let i = left;
            let j = right;
            let pivot = arr[left];
            let changeQueue = [];

            while (i < j) {
                while (arr[j].height > pivot) j--;
                while (i < j && arr[i].height <= pivot) i++;
                let tmp = arr[i];
                arr[i] = arr[j];
                arr[j] = tmp;
                changeQueue.push(arr.slice());
            }
            arr[left] = arr[j];
            arr[j] = pivot;
            changeQueue.push(arr.slice());
            let additionalDelay = delay / changeQueue.length;
            let additionalDelayidx = 0;
            for (const arr of changeQueue) {
                const idx = this.updateHeightList(arr, timei * delay + (additionalDelayidx++) * additionalDelay);
                this.DelayList.push(idx);
            }
            return j;
        }
        quickSort(heightList, 0, length - 1);
        return timeidx;
    }*/
}

export default QuickSort;