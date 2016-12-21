import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';
import Square from './square';

export default class Board extends Component {

    _renderSquare(i) {
        return <Square value={this.props.squares[i]} onClick={() => this.props.onClick(i)}/>
    }

    render() {
        return (
            <View>
                <View style={styles.row}>
                    {this._renderSquare(0)}
                    {this._renderSquare(1)}
                    {this._renderSquare(2)}
                </View>
                <View style={styles.row}>
                    {this._renderSquare(3)}
                    {this._renderSquare(4)}
                    {this._renderSquare(5)}
                </View>
                <View style={styles.row}>
                    {this._renderSquare(6)}
                    {this._renderSquare(7)}
                    {this._renderSquare(8)}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'center'
    }
})

AppRegistry.registerComponent('Board', () => Board);
