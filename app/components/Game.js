import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    ListView,
    Text,
    View
} from 'react-native';
import Board from './Board';
import store from '../store';
import {makeMove, jumpToTurn} from '../actions';

export default class Game extends Component {
    constructor(props) {
        super(props);

        const storeState = store.getState();

        this.state = {
            ...storeState,
            historyDS: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
        };

        store.subscribe(this.onStoreUpdate.bind(this));

        this.onSquareClick = this.onSquareClick.bind(this);
        this.calculateWinner = this.calculateWinner.bind(this);
        this.jumpTo = this.jumpTo.bind(this);
        this.renderRow = this.renderRow.bind(this);
    }

    onStoreUpdate() {
        this.setState(store.getState());
    }

    onSquareClick(i) {
        const history = this.state.history;
        const squares = history[history.length - 1];

        // return if the game is over or the square has already been clicked
        if (!squares || this.calculateWinner(squares) || squares[i]) {
            return;
        }

        store.dispatch(makeMove(i));
    }

    jumpTo(turn) {
        store.dispatch(jumpToTurn(turn));
    }

    calculateWinner(squares) {
        const lines = [
            // horizontal
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            // vertical
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            // diagonal
            [0, 4, 8],
            [2, 4, 6]
        ];

        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }

        return null;
    }

    renderRow(rowData, sectionId, rowId) {
        return <Text onPress={() => this.jumpTo(rowId)}>{rowData}</Text>;
    }

    render() {
        const history = this.state.history;
        const squares = history[this.state.turn];
        const winner = this.calculateWinner(squares);
        const status = winner ?
                        'Winner: ' + winner :
                        'Next Player: ' + this.state.currentTurn;
        const moves = this.state.historyDS.cloneWithRows(history.map(function(state, turn) {
            return turn === 0 ?
                    'Game Start' :
                    'Move #' + turn;
        }));

        return (
            <View style={styles.container}>
                <Text style={styles.status}>
                    {status}
                </Text>
                <Board
                    squares={squares}
                    onClick={(i) => this.onSquareClick(i)}
                />
                <ListView
                    style={styles.moves}
                    dataSource={moves}
                    renderRow={this.renderRow}
                />
            </View>
        );
    }
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
        marginTop: 10,
        marginLeft: 125
    }
});

AppRegistry.registerComponent('Game', () => Game);
