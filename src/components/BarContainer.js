import React, {Component} from 'react';
import Bar from './Bar';

class BarContainer extends Component {
  percentToInt = (percent) => {
    return parseInt(percent);
  };
  intToPercent = (integer) => {
    return integer + "%";
  };
  render() {
    const {heightList}=this.props;
    
    return (<div className="bar-container">
      {heightList.map((height,index)=>(
        <Bar height={this.intToPercent(height)} key={index}/>
      ))}
    </div>);
  }
}

export default BarContainer;