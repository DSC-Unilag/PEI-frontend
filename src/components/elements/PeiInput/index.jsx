import React from 'react';
import PropTypes from 'prop-types';
import Styles from './index.module.css';

const PeiInput = ({
  type,
  name,
  onKeyUp,
  onKeyPress,
  placeholder,
  onClick,
  purple
}) => {
  return (
    <input
      type={type}
      className={purple ? Styles.purpleInput : Styles.input}
      name={name}
      onKeyUp={onKeyUp}
      onKeyPress={onKeyPress}
      onClick={onClick}
      placeholder={placeholder}
    />
  );
};
PeiInput.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string,
  onKeyUp: PropTypes.func,
  onKeyPress: PropTypes.func,
  placeholder: PropTypes.string,
  onClick: PropTypes.func,
  purple: PropTypes.bool
};
PeiInput.defaultProps = {
  type: 'text',
  name: null,
  onKeyUp: null,
  onKeyPress: null,
  placeholder: null,
  onClick: null,
  purple: false
};
export default PeiInput;
