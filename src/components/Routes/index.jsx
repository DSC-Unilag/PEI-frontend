import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Route
  // Redirect
} from 'react-router-dom';
import Sign from '../Auth/SignUp';
import Auth from '../Auth';
import Dashboard from '../Dashboard';
import TempLandingPage from '../TempLandingPage';

const ProtectedRoute = ({
  path,
  component,
  auth,
  exact
  // to
}) =>
  auth ? (
    <Route path={path} exact={!!exact} component={component} />
  ) : (
    // <Redirect to={to || '/signup'} />
    ''
  );
ProtectedRoute.propTypes = {
  path: PropTypes.string.isRequired,
  component: PropTypes.func.isRequired,
  auth: PropTypes.bool.isRequired,
  exact: PropTypes.bool
  // to: PropTypes.string
};
ProtectedRoute.defaultProps = {
  exact: false
  // to: '/signup'
};
const Routes = ({ isLoggedIn }) => {
  console.log(isLoggedIn);
  return (
    <>
      <Route path="/" exact component={TempLandingPage} />
      <ProtectedRoute
        path="/dashboard"
        exact
        auth={isLoggedIn}
        component={Dashboard}
      />
      <Route path="/auth" exact component={Auth} />
      <Route
        path="/signup"
        exact
        render={props => <Sign {...props} signin={false} />}
      />
      <Route
        path="/signin"
        exact
        render={props => <Sign {...props} signin />}
      />
    </>
  );
};
Routes.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired
};
const mapStateToProps = state => ({
  isLoggedIn: state.isLoggedIn
});
export default connect(mapStateToProps)(Routes);
