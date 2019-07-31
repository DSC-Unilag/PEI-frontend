import React, { Component } from 'react';
import firebase from '../../base';
import { Redirect } from 'react-router-dom';
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
    return !this.state.isLoggedIn ? (
      <Redirect from="/auth" to="/signup" />
    ) : (
      <Redirect from="/auth" to="/dashboard" />
    );
  }
}
