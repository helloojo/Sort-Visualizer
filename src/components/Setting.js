import React, {Component} from 'react';

class Setting extends Component {
    onTypeChange = (e) => {
        this.props.handleType(parseInt(e.target.value));
    }

    onElemTypeChange = (e) => {
        this.props.handleElemType(parseInt(e.target.value));
    }

    onElemCountChange = (e) => {
        let length = parseInt(e.target.value) || 1;
        if (length < 1) {
            length = 1;
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

    onRemakeClick = () => {
        this.props.remakeHeightList();
    }

    render() {
        const sortType = [
            "Bubble Sort",
            "Selection Sort",
            "Insertion Sort",
            "Quick Sort",
            "Merge Sort",
            "Heap Sort"
        ];
        const elemType = [
            "Random",
            "Ascending",
            "Descending",
        ]
        const {
            length,
            delay,
            sorting,
            type,
            eType
        } = this.props;
        return (
            <div className="setting">
                <label htmlFor="type">Sort Type</label>
                <br/>
                <select name="type" onChange={this.onTypeChange} value={type}>
                    {sortType.map((sort, index) => (
                        <option value={index} key={index}>{sort}</option>
                    ))}
                </select>
                <br/>
                <label htmlFor="elemtype">Elem Type</label>
                <br/>
                <select name="elemtype" onChange={this.onElemTypeChange} value={eType}>
                    {elemType.map((elem, index) => (
                        <option value={index} key={index}>{elem}</option>
                    ))}
                </select>
                <br/>
                <label htmlFor="num">Elem Count</label>
                <br/>
                <input type="number" name="num" value={length} disabled={sorting} onChange={this.onElemCountChange}/>
                <br/>
                <label htmlFor="delay">Delay</label>
                <br/>
                <input type="number" name="delay" value={delay} disabled={sorting} onChange={this.onDelayChange}/>ms
                <br/>
                <input type="button" value={sorting ? "Stop" : "Start"} onClick={this.onStartClick}/>
                <input type="button" value="remake" disabled={sorting} onClick={this.onRemakeClick}/>
            </div>
        )
    }
}

export default Setting;