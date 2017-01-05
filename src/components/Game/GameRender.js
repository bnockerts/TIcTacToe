import React from 'react';
import styles from './game.scss';
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
    <div className={styles.container}>
      <p className="status">{status}</p>
      <Board
        squares={squares}
        onClick={(i) => this.onSquareClick(i)}
      />
      <History
        moves={moves}
        onClick={this.props.jumpToTurn}
      />
    </div>
  );
}
