import React from 'react';
import Styles from './index.module.css';

const PeiPageLoader = () => {
  return (
    <div className={Styles.loaderContainer}>
      <div>
        <img src="/images/loading.svg" alt="loading" />
        <p>Loading...</p>
      </div>
    </div>
  );
};
export default PeiPageLoader;
