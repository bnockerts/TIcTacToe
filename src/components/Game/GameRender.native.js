import React from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import Board from '../Board';
import History from '../History';

export default function() {
    const history = this.props.history;
    const squares = history[this.props.turn];
    const winner = this.calculateWinner(squares);
    const status = winner ?
                    'Winner: ' + winner :
                    'Next Player: ' + this.props.currentTurn;
    const moves = history.map(function(state, turn) {
        return turn === 0 ? 'Game Start' : 'Move #' + turn;
    });

    return (
        <View style={styles.container}>
            <Text style={styles.status}>
                {status}
            </Text>
            <Board
                squares={squares}
                onClick={(i) => this.onSquareClick(i)}
            />
            <View style={styles.moves}>
                <History
                    moves={moves}
                    onClick={this.props.jumpToTurn}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 25,
        paddingTop: 75
    },
    status: {
        textAlign: 'center',
        marginBottom: 10,
        fontSize: 24
    },
    moves: {
        marginTop: 20,
        marginLeft: 125,
        marginRight: 125
    }
});
