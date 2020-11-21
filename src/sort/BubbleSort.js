import Sort from "./Sort";

class BubbleSort extends Sort {
    sort = () => {
        this.firstIterate(this.elements, this.elements.length, 0);
    }

    firstIterate = (arr, i) => {
        if (i <= 0) {
            return;
        }
        this.secondIterate(arr, i, 0);
    }

    secondIterate = (arr, i, j) => {
        if (j >= i) {
            setTimeout(() => {
                this.firstIterate(arr, i - 1);
            }, this.delay);
            return;
        }
        if (arr[j] > arr[j + 1]) {
            const temp = arr[j];
            arr[j] = arr[j + 1];
            arr[j + 1] = temp;
        }
        this.handler(arr);
        setTimeout(() => this.secondIterate(arr, i, j + 1), this.delay);
    }

}

export default BubbleSort;