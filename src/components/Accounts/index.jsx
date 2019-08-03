import React, { Component } from 'react';
import Styles from './index.module.css';
import FlexContainer from '../FlexContainer';
import AccountsList from '../AccountsList';
import AddAccount from '../AddAccount';
import Transfer from '../Transfer';
import { getAllAccounts } from '../../api';

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      data: null
    };
  }

  componentDidMount() {
    // eslint-disable-next-line no-undef
    const dataBody = { user_id: localStorage.getItem('uid') };
    // eslint-disable-next-line no-undef
    fetch(getAllAccounts, {
      method: 'POST',
      cors: true,
      body: JSON.stringify(dataBody),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(ress => this.setState({ data: ress.data }));
  }

  render() {
    const { accounts, add, transfer } = this.props;
    const { data } = this.state;
    return (
      <>
        <div className={Styles.user}>
          <h1>
            {accounts && `Akin${"'"}s Accounts`}
            {add && 'Add Account'}
            {transfer && 'Transfer Funds'}
          </h1>
          <p>Akinwunmi Aguda</p>
        </div>
        {accounts && (
          <FlexContainer>
            {data ? (
              data.map(item => (
                <div key={Math.random()}>
                  <AccountsList {...item} />
                </div>
              ))
            ) : (
              <AccountsList fade />
            )}
          </FlexContainer>
        )}
        {add && (
          <FlexContainer>
            <AddAccount />
          </FlexContainer>
        )}
        {transfer && (
          <FlexContainer>
            <Transfer />
          </FlexContainer>
        )}
      </>
    );
  }
}

export default User;
