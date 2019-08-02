/* eslint-disable react/button-has-type */
import React, { Component } from 'react';
import Nav from './Nav';
import Styles from './index.module.css';
import User from '../Accounts';

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showNav: true
    };
    this.toggeleNav = this.toggeleNav.bind(this);
  }

  toggeleNav() {
    const { showNav } = this.state;
    this.setState({
      showNav: !showNav
    });
  }

  render() {
    const { showNav } = this.state;
    return (
      <div className={Styles.container}>
        <button
          className={showNav ? Styles.menubtn : Styles.active}
          onClick={this.toggeleNav}
        >
          <div className={showNav ? Styles.btnline : Styles.activebtnline} />
          <div className={showNav ? Styles.btnline : Styles.activebtnline} />
          <div className={showNav ? Styles.btnline : Styles.activebtnline} />
        </button>
        <header className={showNav ? Styles.nav : Styles.hide}>
          <div>
            <Nav />
          </div>
        </header>
        <div className={Styles.main}>{<User {...this.props} />}</div>
      </div>
    );
  }
}
