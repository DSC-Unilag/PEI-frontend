import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Sign from '../Auth/SignUp';
import Auth from '../Auth';
import Dashboard from '../Dashboard';
import TempLandingPage from '../TempLandingPage';

const ProtectedRoute = ({ path, component, auth, exact, to }) =>
  auth ? (
    <Route path={path} exact={!!exact} component={component} />
  ) : (
    <Redirect to={to || '/signin'} />
  );
const Routes = () => {
  return (
    <>
      <Route path="/" exact component={TempLandingPage} />
      <ProtectedRoute path="/dashboard" exact component={Dashboard} />
      <Route path="/auth" exact component={Auth} />
      <Route path="/signup" exact component={Sign} />
      <Route path="/signin" exact render={() => <Sign signin />} />
    </>
  );
};

export default Routes;
