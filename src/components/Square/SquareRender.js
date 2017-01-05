import React from 'react';
import styles from './square.scss';

export default function({value, onClick}) {
  return (
    <button type="text"
      className={styles.square}
      onClick={() => onClick()}
    >
      {value}
    </button>
    );
}
