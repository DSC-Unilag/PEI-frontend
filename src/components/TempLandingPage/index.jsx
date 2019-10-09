/*
eslint-env browser */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Styles from './index.module.css';
import { validateToken } from '../../api';
import * as actions from '../reducers/actions';

class TempLandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false
    };
  }

  componentDidMount() {
    const { login, logUserOut } = this.props;
    const token = localStorage.getItem('token');
    if (token) {
      fetch(validateToken, {
        method: 'POST',
        cors: true,
        body: JSON.stringify({ idToken: token }),
        headers: {
          'content-type': 'application/json'
        }
      })
        .then(response => {
          if (response.ok) {
            response.json().then(data => {
              login(data.data);
              this.setState({
                isLoaded: true
              });
            });
          } else {
            this.setState({
              isLoaded: true
            });
            logUserOut();
          }
          // return response;
        })
        // .then(res => res.json())
        // .then(data => {
        //   login(data.data);
        //   this.setState({
        //     isLoaded: true
        //   });
        // })
        .catch(err => {
          this.setState({
            isLoaded: true
          });
          logUserOut();
          // throw err;
        });
    } else {
      this.setState({
        isLoaded: true
      });
    }
  }

  render() {
    const { isLoaded } = this.state;
    const { isLoggedIn } = this.props;

    return !isLoaded ? (
      <div className={Styles.loaderContainer}>
        <div>
          <img src="/images/loading.svg" alt="loading" />
          <p>Loading...</p>
        </div>
      </div>
    ) : (
      <div>
        <nav className={Styles.nav_bar}>
          <p>
            <Link to="/" className={Styles.home_link}>
              Home
            </Link>
          </p>
          {isLoggedIn && (
            <p>
              <Link to="/dashboard/accounts">Dashboard</Link>
            </p>
          )}
          {!isLoggedIn && (
            <p>
              <Link to="/signin">Sign in</Link>
            </p>
          )}
          {!isLoggedIn && (
            <p>
              <Link to="/signup" className={Styles.last}>
                Sign Up
              </Link>
            </p>
          )}
        </nav>

        <div className={Styles.front_content}>
          <div className={Styles.content}>
            <h1 className={Styles.heading}>
              Funds Transfer Just got easier with PEI!
            </h1>
            {/* <h1 className={Styles.heading}></h1> */}
            <h2>
              Inter-Bank Transfers with ease. No Middle man. Just you and the
              recipient!
            </h2>
            <Link to="/signup" className={Styles.started}>
              Get Started
            </Link>
          </div>
          {/* <img src="/images/trans.svg" alt="Conversion" /> */}
          <div className={Styles.img} />
        </div>
        {/* <div className="home_page_content" /> */}
      </div>
    );
  }
}
const mapStateToProps = state => ({
  isLoggedIn: state.isLoggedIn
});
const mapDispatchToProps = dispatch => ({
  login: userId =>
    dispatch({ type: actions.USER_LOGGED_IN, payload: { uid: userId } }),
  logUserOut: () => {
    dispatch({ type: actions.USER_LOGGED_OUT });
  }
});

TempLandingPage.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  login: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TempLandingPage);
