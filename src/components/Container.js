import React, {Component} from 'react';
import BarContainer from './BarContainer'
import Setting from './Setting';
import '../style/container.css';

class Container extends Component {
    render() {
        return (
            <div className="container">
                <BarContainer length={this.props.length} element={this.props.element} sorting={this.props.sorting}/>
                <Setting
                    {...this.props}
                />
            </div>
        );
    }
}

export default Container;