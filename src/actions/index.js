/**
 * action types
 */

export const MAKE_MOVE = 'MAKE_MOVE';
export const JUMP_TO_TURN = 'JUMP_TO_TURN';

/**
 * action creators
 */

export function makeMove(index) {
    return {
        type: MAKE_MOVE,
        index
    };
}

export function jumpToTurn(turn) {
    turn = Number(turn);

    return {
        type: JUMP_TO_TURN,
        turn
    };
}
