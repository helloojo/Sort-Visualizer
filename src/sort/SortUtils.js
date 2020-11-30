import SortType from "./SortType";

const getSortName = (type) => {
    switch (type) {
        case SortType.Bubble:
            return "Bubble Sort";
        case SortType.Selection:
            return "Selection Sort";
        case SortType.Insertion:
            return "Insertion Sort";
        case SortType.Quick:
            return "Quick Sort";
        case SortType.Merge:
            return "Merge Sort";
        case SortType.Heap:
            return "Heap Sort";
    }
}


export {getSortName};