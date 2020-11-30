import Sort from "./Sort";
import Color from "./Color";

class InsertionSort extends Sort {
    sort = () => {
        this.firstIterate(this.elements, 1);
    }

    firstIterate = (arr, i) => {
        if (i >= arr.length) {
            this.handler(arr);
            return;
        }
        const value = arr[i].height;
        this.secondIterate(arr, i, i - 1, value);
    }

    secondIterate = (arr, i, j, value) => {
        if (j < 0 || arr[j].height <= value) {
            arr[j + 1].height = value;
            arr[j + 1].color = Color.RED;
            this.handler(arr);
            arr[j + 1].color = Color.WHITE;
            this.registerCallback(() => this.firstIterate(arr, i + 1));
            return;
        }
        arr[j + 1].height = arr[j].height;
        arr[j + 1].color = Color.RED;
        arr[j].color = Color.GREEN;
        this.handler(arr);
        arr[j + 1].color = arr[j].color = Color.WHITE;
        this.registerCallback(() => this.secondIterate(arr, i, j - 1, value));
    }
}

export default InsertionSort;