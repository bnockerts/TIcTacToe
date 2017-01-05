import { MAKE_MOVE, JUMP_TO_TURN } from '../actions';

function history(state = [], action, currentTurn) {
  switch (action.type) {
    case MAKE_MOVE:
      const history = state.slice();
      const squares = history[history.length - 1].slice();

      squares[action.index] = currentTurn;

      return history.concat([squares]);
    case JUMP_TO_TURN:
      return state.slice(0, action.turn + 1);
    default:
      return state;
  }
}

function turn(state = 0, action) {
  switch (action.type) {
    case MAKE_MOVE:
      return state + 1;
    case JUMP_TO_TURN:
      return action.turn;
    default:
      return state;
  }
}

function currentTurn(state = 'X', action) {
  switch (action.type) {
    case MAKE_MOVE:
      return state === 'X' ? 'O' : 'X';
    case JUMP_TO_TURN:
      return action.turn % 2 === 0 ? 'X' : 'O';
    default:
      return state;
  }
}

export default function reducers(state = {}, action) {
  return {
    history: history(state.history, action, state.currentTurn),
    turn: turn(state.turn, action),
    currentTurn: currentTurn(state.currentTurn, action)
  };
}
