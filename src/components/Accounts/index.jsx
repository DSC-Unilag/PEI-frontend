import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Styles from './index.module.css';
import FlexContainer from '../FlexContainer';
import AccountsList from '../AccountsList';
import AddAccount from '../AddAccount';
import Transfer from '../Transfer';
import { getAllAccounts, getUserById } from '../../api';

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      userData: null
    };
  }

  componentDidMount() {
    const { uid } = this.props;
    // eslint-disable-next-line no-undef
    const dataBody = { user_id: uid };
    // eslint-disable-next-line no-undef
    fetch(getUserById, {
      method: 'POST',
      cors: true,
      body: JSON.stringify({ uid }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(ress => {
        console.log(uid);
        console.log(ress);
      })
      .catch(err => {
        throw err;
      });

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
            {accounts && `Your Accounts`}
            {add && 'Add Account'}
            {transfer && 'Transfer Funds'}
          </h1>
          <p>Hello Akinwunmi Aguda</p>
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
const mapStateToProps = state => ({
  uid: state.uid
});
User.propTypes = {
  uid: PropTypes.string.isRequired,
  accounts: PropTypes.bool,
  add: PropTypes.bool,
  transfer: PropTypes.bool
};

User.defaultProps = {
  accounts: false,
  add: false,
  transfer: false
};
export default connect(mapStateToProps)(User);
