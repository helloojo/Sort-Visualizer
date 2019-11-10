import React, {Component} from 'react';

class Setting extends Component {
  onTypeChange=(e)=>{
    this.props.handleType(parseInt(e.target.value));
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
    const sortType=[
      "Bubble Sort",
      "Selection Sort",
      "Insertion Sort",
      "Quick Sort",
      "Merge Sort"
    ];
    const {
      length,
      delay,
      sorting,
      type
    } = this.props;
    return (
      <div className="setting">
        <label htmlFor="type">Sort Type</label>
        <br/>
        <select name="type" onChange={this.onTypeChange} value={type}>
          {sortType.map((sort,index)=> (
            <option value={index} key={index}>{sort}</option>
          ))}
        </select>
        <br/>
        <label htmlFor="num">Elem Count</label>
        <br/>
        <input type="number" name="num" value={length} onChange={this.onElemCountChange}></input>
        <br/>
        <label htmlFor="delay">Delay</label>
        <br/>
        <input type="number" name="delay" value={delay} onChange={this.onDelayChange}></input>ms
        <br/>
        <input type="button" value={sorting ? "Stop":"Start"} onClick={this.onStartClick}></input>
        <input type="button" value="remake" onClick={this.onRemakeClick}></input>
      </div>
    )
  }
}

export default Setting;