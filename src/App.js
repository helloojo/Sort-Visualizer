import React from 'react';
import Header from './components/Header';
import Container from './components/Container';
import './style/App.css';

class App extends React.Component {
  Bubble = 0;
  Selection = 1;
  Insertion = 2;
  Quick = 3;
  Merge = 4;
  Heap = 5;
  DelayList=[];

  constructor() {
    super();

    const length = Math.ceil(Math.random() * 90) + 10;
    let heightList = [];

    for (let i = 0; i < length; i++) {
      const height = Math.random() * 100;
      heightList.push(height);
    }

    this.state = {
      sorting: false,
      length,
      heightList,
      type: 0,
      eType: 0,
      delay: 100
    }
  }

  handleLength = (length) => {
    this.setState({
      length,
    },this.remakeHeightList);
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
        offset=100/(length+1);
        heightList.push(offset);
        for(let i=0;i<length-1;i++) {
          heightList.push(heightList[i]+offset);
        }
        break;
      case 2:
        offset=100/(length+1);
        heightList.push(100-offset);
        for(let i=0;i<length-1;i++) {
          heightList.push(heightList[i]-offset);
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

  BubbleSort = (delay, length) => {
    let timeidx = 0;
    const heightList = this.state.heightList.slice();
    for (let i = length - 1; i > 0; i--) {
      for (let j = 0; j < i; j++) {
        if (heightList[j] > heightList[j + 1]) {
          let temp = heightList[j];
          heightList[j] = heightList[j + 1];
          heightList[j + 1] = temp;
          const idx = this.updateHeightList(heightList, (timeidx++)*delay);
          this.DelayList.push(idx);
        }
      }
    }
    return timeidx;
  }

  InsertionSort = (delay, length) => {
    let timeidx = 0;
    const heightList = this.state.heightList.slice();

    for (let index = 1; index < length; index++) {
      let temp = heightList[index];
      let aux = index - 1;
      while ((aux >= 0) && (heightList[aux] > temp)) {
        heightList[aux + 1] = heightList[aux];
        const idx = this.updateHeightList(heightList, (timeidx++)*delay);
        this.DelayList.push(idx);
        aux--;
      }
      heightList[aux + 1] = temp;
      const idx = this.updateHeightList(heightList, (timeidx++)*delay);
      this.DelayList.push(idx);
    }
    return timeidx;
  }

  SelectionSort = (delay, length) => {
    let timeidx = 0;
    const heightList = this.state.heightList.slice();
    let indexMin, temp;

    for (let i = 0; i < length - 1; i++) {
      indexMin = i;
      for (let j = i + 1; j < length; j++) {
        if (heightList[j] < heightList[indexMin]) {
          indexMin = j;
        }
      }
      temp = heightList[indexMin];
      heightList[indexMin] = heightList[i];
      heightList[i] = temp;
      const idx = this.updateHeightList(heightList, (timeidx++)*delay);
      this.DelayList.push(idx);
    }
    return timeidx;
  }

  QuickSort = (delay, length) => {
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
      let changeQueue=[];
      
      while (i < j) {
        while (arr[j] > pivot) j--;
        while (i < j && arr[i] <= pivot) i++;
        let tmp = arr[i];
        arr[i] = arr[j];
        arr[j] = tmp;
        changeQueue.push(arr.slice());
      }
      arr[left] = arr[j];
      arr[j] = pivot;
      changeQueue.push(arr.slice());
      let additionalDelay=delay/changeQueue.length;
      let additionalDelayidx=0;
      for(const arr of changeQueue) {
        const idx = this.updateHeightList(arr, timei*delay+(additionalDelayidx++)*additionalDelay);
        this.DelayList.push(idx);
      }
      return j;
    }
    quickSort(heightList, 0, length - 1);
    return timeidx;
  }

  MergeSort = (delay, length) => {
    let timeidx = 0;
    const heightList = this.state.heightList.slice();
    
    const combine = (arr, left, right, arr_) => {
      for (let i = left; i <= right; i++) {
        arr[i] = arr_[i];
        const idx = this.updateHeightList(arr, (timeidx++)*delay);
        this.DelayList.push(idx);
      }
    }

    const mergeSort = (arr, left, right, arr_) => {
      if (left >= right) return;
      const mid = ((left + right)>>1);
      mergeSort(arr, left, mid, arr_);
      mergeSort(arr, mid + 1, right, arr_);
      for (let k = left, i = left, j = mid + 1; k <= right; k++) {
        if (j > right) arr_[k] = arr[i++];
        else if (i > mid) arr_[k] = arr[j++];
        else if (arr[i] < arr[j]) arr_[k] = arr[i++];
        else arr_[k] = arr[j++];
      }
      combine(arr,left,right,arr_);
    }
    let copyArr=[];
    
    mergeSort(heightList, 0, length-1, copyArr);
    
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
    let timeidx;
    const {
      delay,
      length
    } = this.state;
    switch (type) {
      case this.Bubble:
        timeidx = this.BubbleSort(delay, length);
        break;
      case this.Selection:
        timeidx = this.SelectionSort(delay, length);
        break;
      case this.Insertion:
        timeidx = this.InsertionSort(delay, length);
        break;
      case this.Quick:
        timeidx = this.QuickSort(delay, length);
        break;
      case this.Merge:
        timeidx = this.MergeSort(delay, length);
        break;
      case this.Heap:
        timeidx = this.HeapSort(delay, length);
        break;
      default:
        break;
    }
    setTimeout(() => {
      this.setState({
        sorting: false
      });
    }, (timeidx) * delay);
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
  
  handleType=(type) => {
    this.setState({
      type
    },this.remakeHeightList);
  }

  handleElemType=(type)=> {
    this.setState({
      eType:type
    },this.remakeHeightList);
  }

  render() {
    const {
      sorting,
      length,
      delay,
      heightList,
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
          heightList={heightList}
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
