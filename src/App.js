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
  DelayList=[];

  constructor() {
    super();

    const length = Math.ceil(Math.random() * 90) + 10;
    let heightList = [];
    let colorList = [];

    for (let i = 0; i < length; i++) {
      const height = Math.random() * 100;
      heightList.push(height);
      colorList.push("aquamarine");
    }

    this.state = {
      sorting: false,
      length,
      heightList,
      colorList,
      type: 0,
      delay: 100
    }
  }

  handleLength = (length) => {
    let cur_length = this.state.length;
    let heightList = this.state.heightList.slice();
    
    while (cur_length !== length) {
      if (cur_length > length) {
        heightList.pop();
        cur_length--;
      } else if (cur_length < length) {
        const height = Math.random() * 100;
        heightList.push(height);
        cur_length++;
      }
    }

    this.setState({
      length,
      heightList
    });
  }

  remakeHeightList = () => {
    const length = this.state.length;
    const heightList = [];
    for (let i = 0; i < length; i++) {
      const height = Math.random() * 100;
      heightList.push(height);
    }
    this.setState({
      heightList
    });
  }

  updateHeightList = (heightList, timeidx, delay) => {
    return setTimeout((heightList) => {
      this.setState({
        heightList
      });
    }, timeidx * delay, heightList.slice());
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
          const idx = this.updateHeightList(heightList, timeidx++, delay);
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
        const idx = this.updateHeightList(heightList, timeidx++, delay);
        this.DelayList.push(idx);
        aux--;
      }
      heightList[aux + 1] = temp;
      const idx = this.updateHeightList(heightList, timeidx++, delay);
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
      const idx = this.updateHeightList(heightList, timeidx++, delay);
      this.DelayList.push(idx);
    }
    return timeidx;
  }

  QuickSort = (delay, length) => {
    let timeidx = 0;
    const heightList = this.state.heightList.slice();
    return timeidx;
  }

  MergeSort = (delay, length) => {
    let timeidx = 0;
    const heightList = this.state.heightList.slice();
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
    });
  }

  render() {
    const {
      sorting,
      length,
      delay,
      heightList,
      type
    } = this.state;
    const {
      handleLength,
      handleSorting,
      handleDelay,
      handleType,
      remakeHeightList
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
          handleLength={handleLength} 
          handleSorting={handleSorting}
          handleDelay={handleDelay}
          handleType={handleType}
          remakeHeightList={remakeHeightList}
        />
      </div>
    );
  }
}

export default App;
