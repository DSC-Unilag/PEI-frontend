import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import firebase from '../../base';

export default class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ isLoggedIn: !!user });
    });
  }

  render() {
    const { isLoggedIn } = this.state;
    return !isLoggedIn ? (
      <Redirect from="/auth" to="/signup" />
    ) : (
      <Redirect from="/auth" to="/dashboard" />
    );
  }
}
