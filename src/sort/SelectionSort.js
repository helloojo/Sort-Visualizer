import Sort from "./Sort";
import Color from "./Color";

class SelectionSort extends Sort {
    sort = () => {
        this.firstIterate(this.elements, 0);
    }

    firstIterate = (arr, i) => {
        if (i >= arr.length - 1) {
            this.handler(arr);
            return;
        }
        this.chooseMinElement(arr, i, i + 1, i);
    }

    chooseMinElement = (arr, i, j, minIdx) => {
        if (j >= arr.length) {
            const temp = arr[minIdx];
            arr[minIdx] = arr[i];
            arr[i] = temp;
            arr[minIdx].color = arr[i].color = Color.RED;
            this.handler(arr);
            arr[minIdx].color = arr[i].color = Color.WHITE;
            setTimeout(() => this.firstIterate(arr, i + 1), this.delay);
            return;
        }
        if (arr[j].height < arr[minIdx].height) {
            minIdx = j;
            arr[j].color = Color.RED;
        } else {
            arr[j].color = Color.GREEN;
        }
        this.handler(arr);
        arr[j].color = Color.WHITE;
        setTimeout(() => this.chooseMinElement(arr, i, j + 1, minIdx), this.delay)
    }
}

export default SelectionSort;