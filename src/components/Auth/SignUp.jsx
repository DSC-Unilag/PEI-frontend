import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import firebase from '../../base';
import * as actions from '../reducers/actions';
import PeiButton from '../elements/PeiButton';
import PeiHeading from '../elements/PeiHeading';
import PeiLabel from '../elements/PeiLabel';
import Styles from './index.module.css';
import PeiInput from '../elements/PeiInput';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // eslint-disable-next-line react/no-unused-state
      username: '',
      email: '',
      password: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e) {
    const { signin, login } = this.props;
    const { email, password } = this.state;
    e.preventDefault();
    if (signin) {
      console.log('flem');
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(u => {
          console.log(u);
          login();
        })
        .catch(err => {
          console.log(err);
        });
    } else if (!signin) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(u => {
          console.log(u);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    const { signin = false, isLoggedIn } = this.props;
    return !isLoggedIn ? (
      <>
        <div className={Styles.container}>
          <div className={Styles.form}>
            <PeiHeading>{signin ? 'SignIn' : 'SignUp'}</PeiHeading>
            <form>
              {signin ? (
                ''
              ) : (
                <>
                  {' '}
                  <PeiLabel>Username</PeiLabel>
                  <PeiInput
                    type="text"
                    name="username"
                    onKeyUp={this.handleChange}
                    placeholder="Enter Username"
                  />
                  <br />
                </>
              )}
              <PeiLabel>email</PeiLabel>
              <PeiInput
                type="email"
                name="email"
                onKeyUp={this.handleChange}
                placeholder="Enter Email"
              />
              <br />
              <PeiLabel>Password</PeiLabel>
              <PeiInput
                type="password"
                name="password"
                onKeyUp={this.handleChange}
                placeholder="Enter Password"
              />
              <br />
              <PeiButton type="submit" onClick={this.handleSubmit}>
                {signin ? 'Sign In' : 'Sign Up'}
              </PeiButton>
            </form>
          </div>
        </div>
      </>
    ) : (
      <Redirect
        from={signin ? '/signin' : '/signup'}
        to={signin ? '/dashboard' : '/signin'}
      />
    );
  }
}
const mapStateToProps = state => ({
  isLoggedIn: state.isLoggedIn
});
const mapDispatchToProps = dispatch => ({
  login: () => dispatch({ type: actions.USER_LOGGED_IN })
});

SignUp.propTypes = {
  signin: PropTypes.bool,
  isLoggedIn: PropTypes.bool
};
SignUp.defaultProps = {
  signin: false,
  isLoggedIn: false
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp);
