import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import Sign from '../Auth/SignUp';
import Auth from '../Auth';
import Dashboard from '../Dashboard';
import TempLandingPage from '../TempLandingPage';

const ProtectedRoute = ({
  path,
  component: Component,
  auth,
  exact,
  to,
  ...props
}) => (
  <Route
    path={path}
    exact={!!exact}
    render={() =>
      auth ? <Component {...props} /> : <Redirect to={to || '/signup'} />
    }
  />
);
ProtectedRoute.propTypes = {
  path: PropTypes.string.isRequired,
  component: PropTypes.func.isRequired,
  auth: PropTypes.bool.isRequired,
  exact: PropTypes.bool,
  to: PropTypes.string
};
ProtectedRoute.defaultProps = {
  exact: false,
  to: '/signup'
};
const Routes = props => {
  const { isLoggedIn } = props;
  return (
    <>
      <Route path="/" exact component={TempLandingPage} />
      {/* <ProtectedRoute
        path="/dashboard"
        exact
        auth={isLoggedIn}
        component={Dashboard}
      /> */}
      <Route path="/dashboard" exact auth={isLoggedIn} component={Dashboard} />
      {/* <Route
        path="/dashboard/accounts"
        exact
        render={prop => <Dashboard {...prop} accounts />}
      /> */}
      {/* <Route
        path="/dashboard/transfer"
        exact
        render={prop => <Dashboard {...prop} transfer />}
      /> */}
      <ProtectedRoute
        path="/dashboard/add"
        component={Dashboard}
        add
        auth={isLoggedIn}
        exact
        render={prop => <Dashboard {...prop} add />}
      />
      <Route path="/auth" exact component={Auth} />
      <Route path="/signup" exact render={prop => <Sign {...prop} />} />
      <Route path="/signin" exact render={prop => <Sign {...prop} signin />} />
      <ProtectedRoute
        path="/dashboard/accounts"
        exact
        auth={isLoggedIn}
        component={Dashboard}
        accounts
        render={prop => <Dashboard {...prop} accounts />}
      />
      <ProtectedRoute
        path="/dashboard/transfer"
        exact
        auth={isLoggedIn}
        component={Dashboard}
        // accounts
        render={prop => <Dashboard {...prop} transfer />}
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
