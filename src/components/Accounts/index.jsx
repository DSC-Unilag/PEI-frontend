/* eslint-disable no-nested-ternary */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Styles from './index.module.css';
import FlexContainer from '../FlexContainer';
import AccountsList from '../AccountsList';
import AddAccount from '../AddAccount';
import Transfer from '../Transfer';
import { getAllAccounts, getUser } from '../../api';

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
    const dataBody = { uid };
    // eslint-disable-next-line no-undef
    fetch(getUser, {
      method: 'POST',
      cors: true,
      body: JSON.stringify({ uid }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(ress => {
        this.setState({
          userData: ress
        });
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
    const { data, userData } = this.state;
    return (
      <>
        <div className={Styles.user}>
          <h1>
            {accounts && `Your Accounts`}
            {add && 'Add Account'}
            {transfer && 'Transfer Funds'}
          </h1>
          <p>Hello {userData == null ? '' : userData.data[0].username}</p>
        </div>
        {accounts && (
          <FlexContainer>
            {data ? (
              data.length > 0 ? (
                data.map(item => (
                  <div key={Math.random()}>
                    <AccountsList {...item} />
                  </div>
                ))
              ) : (
                <h3 className={Styles.empty}>
                  No Accounts Found! Add one{' '}
                  <Link to="/dashboard/add">Here</Link>
                </h3>
              )
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
