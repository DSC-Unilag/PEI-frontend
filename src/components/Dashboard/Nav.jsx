/*
eslint-env browser */
import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import firebse from '../../base';
import * as actions from '../reducers/actions';
import Styles from './index.module.css';

const Nav = ({ logUserOut, isLoggedin }) => {
  const logout = () => {
    firebse
      .auth()
      .signOut()
      .then(() => {
        localStorage.removeItem('token');
        logUserOut();
      });
  };
  return !isLoggedin ? (
    <div>
      <div className="nav-items-group">
        <ul className={Styles.navgroup}>
          <Link to="/dashboard/accounts" className={Styles.navitem}>
            Accounts
          </Link>
          <Link to="/dashboard/add" className={Styles.navitem}>
            Add Account
          </Link>
          <Link to="/dashboard/transfer" className={Styles.navitem}>
            Transfer Funds
          </Link>
        </ul>
      </div>
      <div className="nav-items-group">
        <ul className={Styles.navgroup}>
          <li className={Styles.navitem}>
            <div onClick={logout} onKeyUp={logout} tabIndex="0" role="button">
              Logout
            </div>
          </li>
        </ul>
      </div>
    </div>
  ) : (
    <Redirect to="/signin" />
  );
};
const mapStateToProps = state => ({
  isLoggedin: state.isLoggedin
});
const mapDispatchToProps = dispatch => ({
  logUserOut: () => dispatch({ type: actions.USER_LOGGED_OUT })
});

Nav.propTypes = {
  logUserOut: PropTypes.func.isRequired,
  isLoggedin: PropTypes.bool
};

Nav.defaultProps = {
  isLoggedin: false
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Nav);
