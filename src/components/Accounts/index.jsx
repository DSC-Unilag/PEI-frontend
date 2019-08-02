import React from 'react';
import Styles from './index.module.css';
import FlexContainer from '../FlexContainer';
import AccountsList from '../AccountsList';
import AddAccount from '../AddAccount';

const User = ({ accounts, add }) => {
  return (
    <>
      <div className={Styles.user}>
        <h1>
          {accounts && `Akin${"'"}s Accounts`}
          {add && 'Add Account'}
        </h1>
        <p>Akinwunmi Aguda</p>
      </div>
      {accounts && (
        <FlexContainer>
          <AccountsList />
          <AccountsList />
          <AccountsList />
        </FlexContainer>
      )}
      {add && (
        <FlexContainer>
          <AddAccount />
        </FlexContainer>
      )}
    </>
  );
};

export default User;
