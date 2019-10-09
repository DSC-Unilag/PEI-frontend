/* eslint-disable no-nested-ternary */
/* eslint-env browser */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import firebase from '../../base';
import * as actions from '../reducers/actions';
import PeiButton from '../elements/PeiButton';
import PeiHeading from '../elements/PeiHeading';
import PeiLabel from '../elements/PeiLabel';
import Styles from './index.module.css';
import PeiInput from '../elements/PeiInput';
import ErrorHandler from './errors';
import { saveUser } from '../../api';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // eslint-disable-next-line react/no-unused-state
      username: '',
      email: '',
      password: '',
      isLoading: false,
      err: '',
      redirectToSignIn: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e) {
    const { login } = this.props;
    let { signin } = this.props;
    const { email, password, isLoading, redirectToSignIn } = this.state;
    e.preventDefault();
    if (!isLoading) {
      if (redirectToSignIn) {
        signin = true;
      }
      if (signin) {
        this.setState({
          isLoading: true
        });
        firebase
          .auth()
          .signInWithEmailAndPassword(email, password)
          .then(u => {
            firebase
              .auth()
              .currentUser.getIdToken(true)
              .then(idToken => {
                if (localStorage.getItem('token')) {
                  localStorage.removeItem('token');
                  localStorage.setItem('token', idToken);
                } else {
                  localStorage.setItem('token', idToken);
                }
                this.setState({
                  isLoading: false
                });
                login(u.user.uid);
              })
              .catch(err => {
                throw err;
              });
            this.setState({
              isLoading: false
            });
          })
          .catch(err => {
            this.setState({
              err: ErrorHandler(err.code),
              isLoading: false
            });
          });
      } else if (!signin) {
        this.setState({
          isLoading: true
        });
        firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then(u => {
            this.setState({
              isLoading: false
            });
            // eslint-disable-next-line no-undef
            fetch(saveUser, {
              method: 'POST',
              cors: true,
              body: JSON.stringify({ ...this.state, uid: u.user.uid }),
              headers: {
                'Content-Type': 'application/json'
              }
            }).then(() => {
              this.setState({
                redirectToSignIn: true
              });
            });
          })
          .catch(err => {
            this.setState({
              err: ErrorHandler(err.code),
              isLoading: false
            });
          });
      }
    }
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    const { isLoggedIn } = this.props;
    let { signin = false } = this.props;
    const { isLoading, err, redirectToSignIn } = this.state;
    if (redirectToSignIn) {
      signin = true;
    }
    console.log(signin);
    return !isLoggedIn ? (
      <>
        {redirectToSignIn && <Redirect from="/signup" to="/signin" />}
        <div className={Styles.container}>
          <div className={Styles.form}>
            <PeiHeading>{signin ? 'Sign In' : 'Sign Up'}</PeiHeading>
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
              <PeiLabel>Email</PeiLabel>
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
              <p className={Styles.error}>{err}</p>
              <PeiButton type="submit" onClick={this.handleSubmit}>
                {!isLoading ? (
                  signin ? (
                    'Sign In'
                  ) : (
                    'Sign Up'
                  )
                ) : (
                  <img
                    src="images/Roll.svg"
                    alt="roll"
                    className={Styles.loader}
                  />
                )}
              </PeiButton>
            </form>
            <div className={Styles.account}>
              {signin ? (
                <>
                  Don{"'"}t have an account? <Link to="/signup">Sign Up</Link>
                </>
              ) : (
                <>
                  Already have an account? <Link to="/signin">Sign In</Link>
                </>
              )}
            </div>
          </div>
        </div>
      </>
    ) : (
      <Redirect
        from={signin ? '/signin' : '/signup'}
        to={signin ? '/dashboard/accounts' : '/signin'}
      />
    );
  }
}
const mapStateToProps = state => ({
  isLoggedIn: state.isLoggedIn
});
const mapDispatchToProps = dispatch => ({
  login: uid => dispatch({ type: actions.USER_LOGGED_IN, payload: { uid } })
});

SignUp.propTypes = {
  signin: PropTypes.bool,
  isLoggedIn: PropTypes.bool,
  login: PropTypes.func.isRequired
};
SignUp.defaultProps = {
  signin: false,
  isLoggedIn: false
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp);
