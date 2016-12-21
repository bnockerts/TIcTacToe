import React, {Component} from 'react';
import {
    StyleSheet,
    View
} from 'react-native';
import Square from './Square';

function Board({squares, onClick}) {

    function renderSquare(i) {
        return <Square value={squares[i]} onClick={() => onClick(i)}/>
    }

    return (
        <View>
            <View style={styles.row}>
                {renderSquare(0)}
                {renderSquare(1)}
                {renderSquare(2)}
            </View>
            <View style={styles.row}>
                {renderSquare(3)}
                {renderSquare(4)}
                {renderSquare(5)}
            </View>
            <View style={styles.row}>
                {renderSquare(6)}
                {renderSquare(7)}
                {renderSquare(8)}
            </View>
        </View>
    );
}

Board.propTypes = {
    squares: React.PropTypes.array.isRequired,
    onClick: React.PropTypes.func
};

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'center'
    }
});

export default Board;
