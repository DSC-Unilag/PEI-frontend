import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import firebse from '../../base';
import * as actions from '../reducers/actions';
import Styles from './index.module.css';

const Nav = ({ logUserOut, isLoggedin }) => {
  const logout = () => {
    firebse
      .auth()
      .signOut()
      .then(() => {
        logUserOut();
      });
  };
  return !isLoggedin ? (
    <div className={Styles.nav}>
      <div className={Styles.navaccount}>
        <div className={Styles.navimage} />
        <div className={Styles.navemail}>MyAccoungt@mail.com</div>
      </div>

      <div className="nav-items-group">
        <ul className={Styles.navgroup}>
          <li className={Styles.navitem}>Add Account</li>
          <li className={Styles.navitem}>Transfer funds</li>
          <li className={Styles.navitem}>Transfer History</li>
        </ul>
      </div>
      <div className="nav-items-group">
        <ul className={Styles.navgroup}>
          <li className={Styles.navitem}>Account settings</li>
          <li className={Styles.navitem}>
            <div
              onClick={logout}
              onKeyPress={logout}
              tabIndex="0"
              role="button"
            >
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
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Nav);