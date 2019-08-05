import React from 'react';
import PropTypes from 'prop-types';
import Styles from './index.module.css';

const PeiHeading = ({ children, purple }) => (
  <div className={Styles.block}>
    <div className={Styles.container}>
      <h1 className={purple ? Styles.purpleHeading : Styles.heading}>
        {children}
      </h1>
      <hr className={purple ? Styles.purplehr : Styles.hr} />
    </div>
  </div>
);

PeiHeading.propTypes = {
  children: PropTypes.string.isRequired,
  purple: PropTypes.bool
};

PeiHeading.defaultProps = {
  purple: false
};
export default PeiHeading;
