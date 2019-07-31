import React from 'react';
import PropTypes from 'prop-types';
import Styles from './index.module.css';

const PeiInput = ({ type, name, onKeyUp, placeholder }) => {
  return (
    <input
      type={type}
      className={Styles.input}
      name={name}
      onKeyUp={onKeyUp}
      placeholder={placeholder}
    />
  );
};
PeiInput.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string,
  onKeyUp: PropTypes.func,
  placeholder: PropTypes.string
};
PeiInput.defaultProps = {
  type: 'text',
  name: null,
  onKeyUp: null,
  placeholder: null
};
export default PeiInput;
