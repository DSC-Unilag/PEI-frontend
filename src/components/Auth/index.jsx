import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import firebase from '../../base';

export default class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usrLoggedIn: false
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ usrLoggedIn: !!user });
    });
  }

  render() {
    const { usrLoggedIn } = this.state;
    return !usrLoggedIn ? (
      <Redirect from="/auth" to="/signup" />
    ) : (
      <Redirect from="/auth" to="/dasboard/accounts" />
    );
  }
}
