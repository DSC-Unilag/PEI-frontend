import React from 'react';
import PropTypes from 'prop-types';
import Styles from './index.module.css';

const PeiInput = ({ type, name, onKeyUp, placeholder, onClick, purple }) => {
  return (
    <input
      type={type}
      className={purple ? Styles.purpleInput : Styles.input}
      name={name}
      onKeyUp={onKeyUp}
      onClick={onClick}
      placeholder={placeholder}
    />
  );
};
PeiInput.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string,
  onKeyUp: PropTypes.func,
  placeholder: PropTypes.string,
  onClick: PropTypes.func,
  purple: PropTypes.bool
};
PeiInput.defaultProps = {
  type: 'text',
  name: null,
  onKeyUp: null,
  placeholder: null,
  onClick: null,
  purple: false
};
export default PeiInput;
