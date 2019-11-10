import React, {Component} from 'react';
import BarContainer from './BarContainer'
import Setting from './Setting';
import '../style/container.css';

class Container extends Component {
  render() {
    const {
      length,
      delay,
      heightList,
      sorting,
      type,
      handleLength,
      handleSorting,
      handleDelay,
      handleType,
      remakeHeightList
    } = this.props;
    return (<div className="container">
      <BarContainer length={length} heightList={heightList}/>
      <Setting
        length={length} 
        delay={delay}
        sorting={sorting}
        type={type}
        handleLength={handleLength} 
        handleSorting={handleSorting}
        handleDelay={handleDelay}
        handleType={handleType}
        remakeHeightList={remakeHeightList}
      />
    </div>);
  }
}

export default Container;