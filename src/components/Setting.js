import React, {Component} from 'react';
import SortType from "../sort/SortType";
import ElementMakeType from "../sort/ElementMakeType";
import {getSortName} from "../sort/SortUtils";

class Setting extends Component {
    onTypeChange = (e) => {
        this.props.handleSortType(parseInt(e.target.value));
    }

    onElemTypeChange = (e) => {
        this.props.handleElemType(parseInt(e.target.value));
    }

    onElemCountChange = (e) => {
        let length = parseInt(e.target.value) || 1;
        if (length < 1) {
            length = 1;
        } else if (length > 1000) {
            length = 1000;
        }
        this.props.handleLength(parseInt(length));
    }

    onDelayChange = (e) => {
        let delay = parseInt(e.target.value) || 1;
        if (delay < 1) {
            delay = 1;
        }
        this.props.handleDelay(delay);
    }

    onStartClick = () => {
        this.props.handleSorting();
    }

    onStopClick = () => {
        this.props.handleStop();
    }

    onRemakeClick = () => {
        this.props.remakeHeightList();
    }

    render() {
        const sortingType = [];
        for (const type in SortType) {
            sortingType[SortType[type]] = getSortName(SortType[type]);
        }
        const elemType = [];
        for (const type in ElementMakeType) {
            elemType[ElementMakeType[type]] = type;
        }
        const {
            length,
            delay,
            sortType,
            elementType
        } = this.props;
        return (
            <div className="setting">
                <label htmlFor="type">Sort Type</label>
                <br/>
                <select name="type" onChange={this.onTypeChange} value={sortType}>
                    {sortingType.map((sort, index) => (
                        <option value={index} key={index}>{sort}</option>
                    ))}
                </select>
                <br/>
                <label htmlFor="elemtype">Elem Type</label>
                <br/>
                <select name="elemtype" onChange={this.onElemTypeChange} value={elementType}>
                    {elemType.map((elem, index) => (
                        <option value={index} key={index}>{elem}</option>
                    ))}
                </select>
                <br/>
                <label htmlFor="num">Elem Count</label>
                <br/>
                <input type="number" name="num" value={length} onChange={this.onElemCountChange}/>
                <br/>
                <label htmlFor="delay">Delay</label>
                <br/>
                <input type="number" name="delay" value={delay} onChange={this.onDelayChange}/>ms
                <br/>
                <input type="button" value="Start" onClick={this.onStartClick}/>
                <input type="button" value="Stop" onClick={this.onStopClick}/>
                <input type="button" value="remake" onClick={this.onRemakeClick}/>
            </div>
        )
    }
}

export default Setting;