import React, {Component} from 'react';
import {ListView, Text, View} from 'react-native';

class History extends Component {
  static propTypes = {
    moves: React.PropTypes.array,
    onClick: React.PropTypes.func
  };

  constructor(props) {
    super(props);

    const dataSource = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.state = {
        dataSource: dataSource.cloneWithRows(props.moves)
    };

    this.renderRow = this.renderRow.bind(this);
  }

  componentWillReceiveProps(nextProps) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(nextProps.moves)
      });
  }

  renderRow(rowData, sectionId, rowId) {
    return <Text onPress={() => this.props.onClick(rowId)}>{rowData}</Text>;
  }

  render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderRow}
      />
    );
  }
}

export default History;
