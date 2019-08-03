/* eslint-disable no-nested-ternary */
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
      err: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e) {
    const { signin, login } = this.props;
    const { email, password, isLoading } = this.state;
    e.preventDefault();
    if (!isLoading) {
      if (signin) {
        this.setState({
          isLoading: true
        });
        firebase
          .auth()
          .signInWithEmailAndPassword(email, password)
          .then(u => {
            this.setState({
              isLoading: false
            });
            console.log(u);
            // eslint-disable-next-line no-undef
            localStorage.setItem('uid', u.user.uid);
            login();
          })
          .catch(err => {
            console.log(err);
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
            });
            console.log(u);
          })
          .catch(err => {
            console.log(err);
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
    const { signin = false, isLoggedIn } = this.props;
    const { isLoading, err } = this.state;
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
  login: () => dispatch({ type: actions.USER_LOGGED_IN })
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
