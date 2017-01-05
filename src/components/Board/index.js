import React from 'react';
import BoardRender from './BoardRender';

function Board(props) {
    return BoardRender(props);
}

Board.propTypes = {
    squares: React.PropTypes.array.isRequired,
    onClick: React.PropTypes.func
};

export default Board;
