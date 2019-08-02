import React from 'react';
import { Link } from 'react-router-dom';

const TempLandingPage = () => {
  return (
    <div>
      <Link to="/accounts">Dashboard</Link>
      <br />
      <Link to="/auth">Auth</Link>
    </div>
  );
};
export default TempLandingPage;
