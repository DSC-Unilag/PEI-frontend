import React, { Component } from 'react';
import Styles from './index.module.css';
import FlexContainer from '../FlexContainer';
import AccountsList from '../AccountsList';
import AddAccount from '../AddAccount';
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
    const dataBody = { user_id: localStorage.getItem('uid') };
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
    const { accounts, add } = this.props;
    const { data } = this.state;
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
      </>
    );
  }
}

export default User;
