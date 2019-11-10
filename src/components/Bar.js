import React, {
  Component
} from 'react';

class Bar extends Component {
  render() {
    const style={
      height: this.props.height,
    }
    return (
      <div className="bar" style={style}></div>
    );
  }
}

export default Bar;