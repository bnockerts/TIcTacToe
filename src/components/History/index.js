import React, {Component} from 'react';
import HistoryRender from './HistoryRender';

class History extends Component {
  render() {
    return HistoryRender.call(this, this.props, this.state);
  }
}

History.propTypes = {
  moves: React.PropTypes.array,
  onClick: React.PropTypes.func
};

export default History;
