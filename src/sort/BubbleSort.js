import Sort from "./Sort";
import Color from "./Color";

class BubbleSort extends Sort {
    sort = () => {
        this.firstIterate(this.elements, this.elements.length - 1, 0);
    }

    firstIterate = (arr, i) => {
        if (i <= 0) {
            return;
        }
        this.secondIterate(arr, i, 0);
    }

    secondIterate = (arr, i, j) => {
        if (j >= i) {
            this.handler(arr);
            this.firstIterate(arr, i - 1);
            return;
        }
        if (arr[j].height > arr[j + 1].height) {
            const temp = arr[j];
            arr[j] = arr[j + 1];
            arr[j + 1] = temp;
            arr[j].color = Color.RED;
            arr[j + 1].color = Color.RED;
        } else {
            arr[j].color = Color.GREEN;
            arr[j + 1].color = Color.GREEN;
        }
        this.handler(arr);
        arr[j].color = arr[j + 1].color = Color.WHITE;
        setTimeout(() => this.secondIterate(arr, i, j + 1), this.delay);
    }
}

export default BubbleSort;