import React from 'react';
import Styles from './index.module.css';
const PeiLabel = ({ children, purple }) => {
  return <label className={Styles.container}>{children}</label>;
};
export default PeiLabel;
