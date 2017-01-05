import React from 'react';
import SquareRender from './SquareRender';

function Square(props) {
    return SquareRender(props);
}

Square.propTypes = {
    value: React.PropTypes.string,
    onClick: React.PropTypes.func
};

export default Square;
