import React from 'react';
import PropTypes from 'prop-types';
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

PeiButton.propTypes = {
  children: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  purple: PropTypes.bool
};

PeiButton.defaultProps = {
  purple: false
};
export default PeiButton;
