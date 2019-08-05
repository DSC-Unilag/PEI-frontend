import React from 'react';
import PropTypes from 'prop-types';
import Styles from './index.module.css';

const PeiToast = ({ children }) => (
  <div className={Styles.peiToast}>
    <div>
      <div>{children}</div>
    </div>
  </div>
);

PeiToast.propTypes = {
  children: PropTypes.string.isRequired
};

export default PeiToast;
