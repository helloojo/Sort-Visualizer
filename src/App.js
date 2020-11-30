import React from 'react';
import Header from './components/Header';
import Container from './components/Container';
import './style/App.css';
import Element from "./sort/Element";
import ElementMakeType from "./sort/ElementMakeType";
import SortFactory from "./sort/SortFactory";
import SortType from "./sort/SortType";

class App extends React.Component {
    sortFactory = new SortFactory();
    sortInstance;

    constructor(props) {
        super(props);

        const length = 100;
        let element = new Element();
        element.initElements(length, ElementMakeType.RANDOM);

        this.state = {
            length,
            element,
            sortType: SortType.Bubble,
            elementType: ElementMakeType.RANDOM,
            delay: 10
        }
    }

    handleLength = (length) => {
        this.setState({
            length,
        }, this.remakeHeightList);
    }

    remakeHeightList = () => {
        this.handleStop();
        const {
            element,
            length,
            elementType
        } = this.state;
        element.initElements(length, elementType);
        this.setState({element});
    }

    updateElementArr = (arr) => {
        const element = this.state.element;
        element.arr = arr;
        this.setState({
            element
        });
    }

    handleSorting = () => {
        const {
            sortType,
            delay
        } = this.state;
        this.sortInstance = this.sortFactory.getSort(sortType, this.state.element.arr, delay, this.updateElementArr, this.handleSorting);
        this.handleStop();
        this.sortInstance.start();
    }

    handleStop = () => {
        if(this.sortInstance) {
            this.sortInstance.stop();
        }
    }

    handleDelay = (delay) => {
        this.handleStop();
        this.setState({
            delay
        });
    }

    handleSortType = (sortType) => {
        this.handleStop();
        this.setState({
            sortType
        }, this.remakeHeightList);
    }

    handleElemType = (elementType) => {
        this.handleStop();
        this.setState({
            elementType
        }, this.remakeHeightList);
    }

    render() {
        const {
            sorting,
            length,
            delay,
            element,
            sortType,
            elementType
        } = this.state;
        const {
            handleLength,
            handleSorting,
            handleStop,
            handleDelay,
            handleSortType,
            remakeHeightList,
            handleElemType
        } = this;
        return (
            <div className="App">
                <Header/>
                <Container
                    {...this.state}
                    {...this}
                />
            </div>
        );
    }
}

export default App;
