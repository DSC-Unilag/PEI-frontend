/* eslint-disable react/button-has-type */
import React, { Component } from 'react';
import Nav from './Nav';
import Styles from './index.module.css';

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showNav: false
    };
  }

  render() {
    const { showNav } = this.state;
    return (
      <div className={Styles.container}>
        <header>
          <button className={Styles.menubtn}>
            <div className={Styles.btnline} />
            <div className={Styles.btnline} />
            <div className={Styles.btnline} />
          </button>
          <div className={showNav ? 'show' : 'close'}>
            <Nav />
          </div>
        </header>
        <div className="main">Main</div>
      </div>
    );
  }
}
