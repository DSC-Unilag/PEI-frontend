import React from 'react';
import Styles from './index.module.css';

const PeiButton = ({ children, type, onClick, purple }) => (
  // eslint-disable-next-line react/button-has-type
  <button
    type={type}
    onClick={onClick}
    className={purple ? Styles.purpleButton : Styles.button}
  >
    {children}
  </button>
);
export default PeiButton;
