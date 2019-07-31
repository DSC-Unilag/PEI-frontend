import React from 'react';
import PropTypes from 'prop-types';
import Styles from './index.module.css';

const PeiLabel = ({ children, purple }) => {
  return (
    <label className={purple ? Styles.purpleLabel : Styles.label}>
      {children}
    </label>
  );
};

PeiLabel.propTypes = {
  children: PropTypes.string.isRequired,
  purple: PropTypes.bool
};
PeiLabel.defaultProps = {
  purple: false
};
export default PeiLabel;
