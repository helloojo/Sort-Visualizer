import React from 'react';
import Header from './components/Header';
import Container from './components/Container';
import './style/App.css';
import BubbleSort from "./sort/BubbleSort";
import SelectionSort from "./sort/SelectionSort";
import InsertionSort from "./sort/InsertionSort";
import Element from "./sort/Element";
import ElementMakeType from "./sort/ElementMakeType";
import QuickSort from "./sort/QuickSort";
import BottomUpMergeSort from "./sort/BottomUpMergeSort";
import HeapSort from "./sort/HeapSort";

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

        const length = 100;
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

    startSorting = (type) => {
        const {
            delay,
        } = this.state;
        let sort;
        switch (type) {
            case this.Bubble:
                sort = new BubbleSort(this.state.element.arr, delay, this.updateElementArr);
                break;
            case this.Selection:
                sort = new SelectionSort(this.state.element.arr, delay, this.updateElementArr);
                break;
            case this.Insertion:
                sort = new InsertionSort(this.state.element.arr, delay, this.updateElementArr);
                break;
            case this.Quick:
                sort = new QuickSort(this.state.element.arr, delay, this.updateElementArr);
                break;
            case this.Merge:
                sort = new BottomUpMergeSort(this.state.element.arr, delay, this.updateElementArr);
                break;
            case this.Heap:
                sort = new HeapSort(this.state.element.arr, delay, this.updateElementArr);
                break;
            default:
                break;
        }
        sort.start();
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
