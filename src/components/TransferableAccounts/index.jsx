import React from 'react';
import Styles from './index.module.css';

const TransferableAccounts = ({ name, acc }) => {
  console.log(name, acc);
  return (
    <div className={Styles.container}>
      <div className={Styles.name}>{name}</div>
      <div className={Styles.acc}>{acc}</div>
    </div>
  );
};

export default TransferableAccounts;
