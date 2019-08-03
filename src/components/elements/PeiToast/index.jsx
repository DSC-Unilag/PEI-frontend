import React from 'react';
import Styles from './index.module.css';

const PeiToast = ({ children }) => (
  <div className={Styles.peiToast}>
    <div>
      <div>{children}</div>
    </div>
  </div>
);

export default PeiToast;
