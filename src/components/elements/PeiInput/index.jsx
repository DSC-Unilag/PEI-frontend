import React from 'react';
import Styles from './index.module.css';
const PeiInput = ({ type, name, onKeyUp }) => {
  return (
    <input
      type={type}
      className={Styles.container}
      name={name}
      onKeyUp={onKeyUp}
    />
  );
};
export default PeiInput;
