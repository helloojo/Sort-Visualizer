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
      eType,
      handleLength,
      handleSorting,
      handleDelay,
      handleType,
      remakeHeightList,
      handleElemType
    } = this.props;
    return (<div className="container">
      <BarContainer length={length} heightList={heightList} sorting={sorting}/>
      <Setting
        length={length} 
        delay={delay}
        sorting={sorting}
        type={type}
        eType={eType}
        handleLength={handleLength} 
        handleSorting={handleSorting}
        handleDelay={handleDelay}
        handleType={handleType}
        remakeHeightList={remakeHeightList}
        handleElemType={handleElemType}
      />
    </div>);
  }
}

export default Container;