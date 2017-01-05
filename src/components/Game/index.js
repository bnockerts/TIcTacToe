import {Component} from 'react';
import {connect} from 'react-redux';
import store from '../../store';
import {makeMove, jumpToTurn} from '../../actions';
import GameRender from './GameRender';

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
        return GameRender.call(this, this.props, this.state);
    }
}

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
