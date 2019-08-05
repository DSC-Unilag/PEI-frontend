import React from 'react';
import { Link } from 'react-router-dom';
import Styles from './index.module.css';

const TempLandingPage = () => {
  return (
    <div>
      <nav className={Styles.nav_bar}>
        <p><Link to="Home">Home</Link></p> 
        <p><Link to="/dashboard">Dashboard</Link></p>
        <p><Link to="/auth">Auth</Link></p>
      </nav>

      <div className={Styles.front_content}>
        <img src="\images\undraw_mobile_payments_edgf.svg" alt="Conversion"></img>
      </div>

      <div className="home_page_content">

      </div>

    </div>
  );
};

export default TempLandingPage;
