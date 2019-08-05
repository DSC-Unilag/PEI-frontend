import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../reducers/actions';

const Auth = ({ isLoggedIn }) => {
  return !isLoggedIn ? (
    <Redirect from="/auth" to="/signup" />
  ) : (
    <Redirect from="/auth" to="/dasboard/accounts" />
  );
};
const mapStateToProps = state => ({
  isLoggedIn: state.isLoggedIn
});
const mapDispatchToProps = dispatch => ({
  login: () => dispatch({ type: actions.USER_LOGGED_IN })
});

Auth.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth);
