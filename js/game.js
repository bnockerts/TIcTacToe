import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    ListView,
    Text,
    View
} from 'react-native';
import Board from './board';

export default class Game extends Component {
    constructor() {
        super();

        this.state = {
            history: [{
                squares: Array(9).fill(null)
            }],
            turn: 0,
            xIsNext: true,
            historyDS: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
        };

        this._onSquareClick = this._onSquareClick.bind(this);
        this._calculateWinner = this._calculateWinner.bind(this);
        this._jumpTo = this._jumpTo.bind(this);
        this._renderRow = this._renderRow.bind(this);
    }

    _onSquareClick(i) {
        const history = this.state.history.slice(0, this.state.turn + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();

        // return if the game is over or the square has already been clicked
        if (this._calculateWinner(squares) || squares[i]) {
            return;
        }


        squares[i] = this.state.xIsNext ? 'X' : 'O';

        const moves = history.map(function(state, turn) {
            return turn === 0 ?
                    'Game Start' :
                    'Move #' + turn;
        });

        this.setState({
            history: history.concat([{
                squares: squares
            }]),
            turn: history.length,
            xIsNext: !this.state.xIsNext,
            historyDS: this.state.historyDS.cloneWithRows(moves),

        });
    }

    _jumpTo(turn) {
         this.setState({
            turn: Number(turn),
            xIsNext: (turn % 2) ? false : true,
        });
    }

    _calculateWinner(squares) {
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

    _renderRow(rowData, sectionId, rowId) {
        return <Text onPress={() => this._jumpTo(rowId)}>{rowData}</Text>;
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.turn];
        const winner = this._calculateWinner(current.squares);
        const status = winner ?
                        'Winner: ' + winner :
                        'Next Player: ' + (this.state.xIsNext ? 'X': 'O');
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
                    squares={current.squares}
                    onClick={(i) => this._onSquareClick(i)}
                />
                <ListView
                    style={styles.moves}
                    dataSource={moves}
                    renderRow={this._renderRow}
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
