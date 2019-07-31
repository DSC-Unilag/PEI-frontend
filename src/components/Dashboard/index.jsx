import React, { Component } from 'react';
import PeiHeading from '../elements/PeiHeading';
import Nav from './Nav';
import Styles from './index.module.css';

export default class index extends Component {
  state = {
    showNav: false
  };

  render() {
    return (
      <div className={Styles.container}>
        <header>
          <button className={Styles.menubtn}>
            <div className={Styles.btnline} />
            <div className={Styles.btnline} />
            <div className={Styles.btnline} />
          </button>
          <div className={this.state.showNav ? 'show' : 'close'}>
            <Nav />
          </div>
        </header>
        <div className="main">Main</div>
      </div>
    );
  }
}
