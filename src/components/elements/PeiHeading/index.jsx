import React from 'react';
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
export default PeiHeading;
