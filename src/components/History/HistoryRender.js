import React from 'react';
import styles from './History.scss';

export default function() {
  const props = this.props;

  return (
    <div>
      {props.moves.map(function(move, i) {
        return <p key={i} onClick={() => props.onClick(i)}>{move}</p>;
      })}
    </div>
  );
}
