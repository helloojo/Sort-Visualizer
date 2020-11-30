import SortType from "./SortType";
import BubbleSort from "./BubbleSort";
import SelectionSort from "./SelectionSort";
import InsertionSort from "./InsertionSort";
import BottomUpMergeSort from "./BottomUpMergeSort";
import QuickSort from "./QuickSort";
import HeapSort from "./HeapSort";

class SortFactory {
    constructor() {
        this.sorts = [];
    }

    getSort = (type, elements, delay, handler, stopHandler) => {
        if (this.sorts[type] === undefined) {
            this.sorts[type] = getSortInstance(type);
        }
        this.sorts[type].elements = elements;
        this.sorts[type].delay = delay;
        this.sorts[type].handler = handler;
        this.sorts[type].stopHandler = stopHandler;
        return this.sorts[type];
    }
}

function getSortInstance(type) {
    switch (type) {
        case SortType.Bubble:
            return new BubbleSort();
        case SortType.Selection:
            return new SelectionSort();
        case SortType.Insertion:
            return new InsertionSort();
        case SortType.Merge:
            return new BottomUpMergeSort();
        case SortType.Quick:
            return new QuickSort();
        case SortType.Heap:
            return new HeapSort();
        default:
            return null;
    }
}

export default SortFactory;