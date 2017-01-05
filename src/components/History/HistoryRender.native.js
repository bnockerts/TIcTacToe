import React from 'react';
import {
    View,
    Text,
    ListView,
    StyleSheet
} from 'react-native';

let dataSource = new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1 !== r2
  });

export default function() {
  function renderRow(rowData, sectionId, rowId) {
    return <Text onPress={() => this.props.onClick(rowId)}>{rowData}</Text>;
  }

  dataSource = dataSource.cloneWithRows(this.props.moves);

  return (
    <ListView
      dataSource={dataSource}
      renderRow={renderRow}
    />
  );
}

const styles = StyleSheet.create({});
