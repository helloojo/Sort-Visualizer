import React from 'react';
import Header from './components/Header';
import Container from './components/Container';
import './style/App.css';
import BubbleSort from "./sort/BubbleSort";
import SelectionSort from "./sort/SelectionSort";
import InsertionSort from "./sort/InsertionSort";
import Element from "./sort/Element";
import ElementMakeType from "./sort/ElementMakeType";

class App extends React.Component {
    Bubble = 0;
    Selection = 1;
    Insertion = 2;
    Quick = 3;
    Merge = 4;
    Heap = 5;
    DelayList = [];

    constructor() {
        super();

        const length = 10;
        let element = new Element();
        element.initElements(length, ElementMakeType.RANDOM);

        this.state = {
            sorting: false,
            length,
            element,
            type: 0,
            eType: 0,
            delay: 50
        }
    }

    handleLength = (length) => {
        this.setState({
            length,
        }, this.remakeHeightList);
    }

    remakeHeightList = () => {
        const length = this.state.length;
        const heightList = [];
        let offset;
        switch (this.state.eType) {
            case 0:
                for (let i = 0; i < length; i++) {
                    const height = Math.random() * 100;
                    heightList.push(height);
                }
                break;
            case 1:
                offset = 100 / (length + 1);
                heightList.push(offset);
                for (let i = 0; i < length - 1; i++) {
                    heightList.push(heightList[i] + offset);
                }
                break;
            case 2:
                offset = 100 / (length + 1);
                heightList.push(100 - offset);
                for (let i = 0; i < length - 1; i++) {
                    heightList.push(heightList[i] - offset);
                }
                break;
            default:
                break;
        }

        this.setState({
            heightList
        });
    }

    updateHeightList = (heightList, delay) => {
        return setTimeout((heightList) => {
            this.setState({
                heightList
            });
        }, delay, heightList.slice());
    }

    updateElementArr = (arr) => {
        this.setState({
            element: {
                arr
            }
        });
    }

    MergeSort = (delay, length) => {
        let timeidx = 0;
        const heightList = this.state.heightList.slice();

        const combine = (arr, left, right, arr_) => {
            for (let i = left; i <= right; i++) {
                arr[i] = arr_[i];
                const idx = this.updateHeightList(arr, (timeidx++) * delay);
                this.DelayList.push(idx);
            }
        }

        const mergeSort = (arr, left, right, arr_) => {
            if (left >= right) return;
            const mid = ((left + right) >> 1);
            mergeSort(arr, left, mid, arr_);
            mergeSort(arr, mid + 1, right, arr_);
            for (let k = left, i = left, j = mid + 1; k <= right; k++) {
                if (j > right) arr_[k] = arr[i++];
                else if (i > mid) arr_[k] = arr[j++];
                else if (arr[i] < arr[j]) arr_[k] = arr[i++];
                else arr_[k] = arr[j++];
            }
            combine(arr, left, right, arr_);
        }
        let copyArr = [];

        mergeSort(heightList, 0, length - 1, copyArr);

        return timeidx;
    }

    HeapSort = (delay, length) => {
        let timeidx = 0;
        const heightList = this.state.heightList.slice();
        const constructHeap = (arr, len) => {
            for (let i = (len >> 1) - 1; i >= 0; i--) {
                downHeap(arr, i, len);
            }
        }
        const downHeap = (arr, here, len) => {
            const data = arr[here];
            let left, right, cmp_idx;
            while ((left = (here << 1) + 1) < len) {
                right = left + 1;
                if (left === len - 1) {
                    cmp_idx = left;
                } else if (arr[left] > arr[right]) {
                    cmp_idx = left;
                } else {
                    cmp_idx = right;
                }
                if (data > arr[cmp_idx]) {
                    break;
                }
                arr[here] = arr[cmp_idx];
                here = cmp_idx;
            }
            arr[here] = data;
            const idx = this.updateHeightList(arr, (timeidx++) * delay);
            this.DelayList.push(idx);
        }

        const heapSort = (arr, len) => {
            constructHeap(arr, len);

            for (let l = len - 1; l > 0; l--) {
                const temp = arr[0];
                arr[0] = arr[l];
                arr[l] = temp;
                downHeap(arr, 0, l);
            }
        }
        heapSort(heightList, length);

        return timeidx;
    }

    startSorting = (type) => {
        let timeIdx;
        const {
            delay,
            length
        } = this.state;
        switch (type) {
            case this.Bubble:
                const sort = new BubbleSort(this.state.element.arr, delay, this.updateElementArr);
                sort.start()
                // timeIdx = this.BubbleSort(delay, length);
                break;
            case this.Selection:
                const sort2 = new SelectionSort(this.state.element.arr, delay, this.updateElementArr);
                sort2.start();
                // timeIdx = this.SelectionSort(delay, length);
                break;
            case this.Insertion:
                const sort3 = new InsertionSort(this.state.element.arr, delay, this.updateElementArr);
                sort3.start();
                // timeIdx = this.InsertionSort(delay, length);
                break;
            case this.Quick:
                timeIdx = this.QuickSort(delay, length);
                break;
            case this.Merge:
                timeIdx = this.MergeSort(delay, length);
                break;
            case this.Heap:
                timeIdx = this.HeapSort(delay, length);
                break;
            default:
                break;
        }
        setTimeout(() => {
            this.setState({
                sorting: false
            });
        }, (timeIdx) * delay);
    }

    handleSorting = () => {
        this.setState({
            sorting: !this.state.sorting
        });
        if (this.state.sorting === false) {
            this.DelayList = [];
            this.startSorting(this.state.type);
        } else {
            for (const idx of this.DelayList) {
                clearTimeout(idx);
            }
            this.DelayList = [];
        }
    }

    handleDelay = (delay) => {
        this.setState({
            delay
        });
    }

    handleType = (type) => {
        this.setState({
            type
        }, this.remakeHeightList);
    }

    handleElemType = (type) => {
        this.setState({
            eType: type
        }, this.remakeHeightList);
    }

    render() {
        const {
            sorting,
            length,
            delay,
            element,
            type,
            eType
        } = this.state;
        const {
            handleLength,
            handleSorting,
            handleDelay,
            handleType,
            remakeHeightList,
            handleElemType
        } = this;
        return (
            <div className="App">
                <Header/>
                <Container
                    length={length}
                    delay={delay}
                    sorting={sorting}
                    heightList={element}
                    type={type}
                    eType={eType}
                    handleLength={handleLength}
                    handleSorting={handleSorting}
                    handleDelay={handleDelay}
                    handleType={handleType}
                    remakeHeightList={remakeHeightList}
                    handleElemType={handleElemType}
                />
            </div>
        );
    }
}

export default App;
