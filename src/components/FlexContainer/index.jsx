import React from 'react';
import Styles from './index.module.css';

const FlexContainer = ({ children }) => {
  return <div className={Styles.container}>{children}</div>;
};

export default FlexContainer;
