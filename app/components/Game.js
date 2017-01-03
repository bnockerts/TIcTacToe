import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import {connect} from 'react-redux';
import Board from './Board';
import History from './History';
import store from '../store';
import {makeMove, jumpToTurn} from '../actions';

class Game extends Component {
    constructor(props) {
        super(props);

        this.onSquareClick = this.onSquareClick.bind(this);
        this.calculateWinner = this.calculateWinner.bind(this);
    }

    onSquareClick(i) {
        const history = this.props.history;
        const squares = history[history.length - 1];

        // return if the game is over or the square has already been clicked
        if (!squares || this.calculateWinner(squares) || squares[i]) {
            return;
        }

        store.dispatch(makeMove(i));
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

    render() {
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

function mapStateToProps(store) {
    return {
        history: store.history,
        turn: store.turn,
        currentTurn: store.currentTurn
    };
}

function mapDispatchToProps(dispatch) {
    return {
        jumpToTurn: (turn) => dispatch(jumpToTurn(turn))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Game);
