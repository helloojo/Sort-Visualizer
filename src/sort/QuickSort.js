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
            this.quickSort(arr, left, j - 1);
            this.quickSort(arr, j + 1, right);
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
}

export default QuickSort;