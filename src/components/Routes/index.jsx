import React from 'react';
import { Route } from 'react-router-dom';
import Auth from '../Auth';
import Dashboard from '../Dashboard';
import TempLandingPage from '../TempLandingPage';
const Routes = () => {
  return (
    <>
      <Route path="/" exact component={TempLandingPage} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/auth" component={Auth} />
    </>
  );
};

export default Routes;
