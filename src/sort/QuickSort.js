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
            [arr[left].height, arr[j].height] = [arr[j].height, pivot];
            arr[left].color = arr[j].color = Color.RED;
            this.handler(arr);
            arr[left].color = arr[j].color = Color.WHITE;
            this.quickSort(arr, left, j - 1);
            this.quickSort(arr, j + 1, right);
            return;
        }
        while (arr[j].height > pivot) j--;
        while (i < j && arr[i].height <= pivot) i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
        arr[i].color = arr[j].color = Color.RED;
        this.handler(arr);
        arr[i].color = arr[j].color = Color.WHITE;
        this.registerCallback(() => this.position(arr, left, right, i, j, pivot));
    }
}

export default QuickSort;