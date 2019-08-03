import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import firebase from '../../base';
import * as actions from '../reducers/actions';

class Auth extends Component {
  componentDidMount() {
    const { login } = this.props;
    firebase.auth().onAuthStateChanged(user => {
      login();
    });
  }

  render() {
    const { isLoggedIn } = this.props;
    return !isLoggedIn ? (
      <Redirect from="/auth" to="/signup" />
    ) : (
      <Redirect from="/auth" to="/dasboard/accounts" />
    );
  }
}
const mapStateToProps = state => ({
  isLoggedIn: state.isLoggedIn
});
const mapDispatchToProps = dispatch => ({
  login: () => dispatch({ type: actions.USER_LOGGED_IN })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth);
