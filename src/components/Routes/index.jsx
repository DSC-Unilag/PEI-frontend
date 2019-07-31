import React from 'react';
import { Route } from 'react-router-dom';
import Sign from '../Auth/SignUp';
import Auth from '../Auth';
import Dashboard from '../Dashboard';
import TempLandingPage from '../TempLandingPage';
const Routes = () => {
  return (
    <>
      <Route path="/" exact component={TempLandingPage} />
      <Route path="/dashboard" exact component={Dashboard} />
      <Route path="/auth" exact component={Auth} />
      <Route path="/signup" exact component={Sign} />
      <Route path="/signin" exact render={props => <Sign signin />} />
    </>
  );
};

export default Routes;
