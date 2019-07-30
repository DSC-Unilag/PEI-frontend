import React, { Component } from 'react';
import PeiHeading from '../elements/PeiHeading';
import Styles from './index.module.css';
export default class SignUp extends Component {
  render() {
    return (
      <div className={Styles.container}>
        <div className={Styles.form}>
          <PeiHeading>SignUp</PeiHeading>
        </div>
      </div>
    );
  }
}
