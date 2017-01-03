import { createStore } from 'redux'
import reducers from './reducers'

const store = createStore(reducers, {
    history: [Array(9).fill(null)],
    turn: 0,
    currentTurn: 'O'
});

export default store;
