import React from 'react';
import Styles from './index.module.css';

export default function Nav() {
  return (
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
          <li className={Styles.navitem}>Logout</li>
        </ul>
      </div>
    </div>
  );
}
