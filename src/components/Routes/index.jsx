/*
eslint-env browser */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import * as actions from '../reducers/actions';
import Sign from '../Auth/SignUp';
import Auth from '../Auth';
import Dashboard from '../Dashboard';
import TempLandingPage from '../TempLandingPage';
import { validateToken } from '../../api';
import PeiPageLoader from '../elements/PeiPageLoader';

const ProtectedRoute = ({
  path,
  component: Comp,
  auth,
  exact,
  to,
  ...props
}) => (
  <Route
    path={path}
    exact={!!exact}
    render={() =>
      auth ? <Comp {...props} /> : <Redirect to={to || '/signup'} />
    }
  />
);
ProtectedRoute.propTypes = {
  path: PropTypes.string.isRequired,
  component: PropTypes.func.isRequired,
  auth: PropTypes.bool.isRequired,
  exact: PropTypes.bool,
  to: PropTypes.string
};
ProtectedRoute.defaultProps = {
  exact: false,
  to: '/signup'
};

class Routes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false
    };
  }

  componentDidMount() {
    const { login } = this.props;
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
        .then(res => res.json())
        .then(data => {
          login(data.data);
          this.setState({
            isLoaded: true
          });
        })
        .catch(err => {
          this.setState({
            isLoaded: true
          });
          throw err;
        });
    } else {
      this.setState({
        isLoaded: true
      });
    }
  }

  render() {
    const { isLoggedIn } = this.props;
    const { isLoaded } = this.state;
    return isLoaded ? (
      <>
        <Route path="/" exact component={TempLandingPage} />
        <ProtectedRoute
          path="/dashboard/add"
          component={Dashboard}
          add
          auth={isLoggedIn}
          exact
          render={prop => <Dashboard {...prop} add />}
        />
        <Route path="/auth" exact component={Auth} />
        <Route path="/signup" exact render={prop => <Sign {...prop} />} />
        <Route
          path="/signin"
          exact
          render={prop => <Sign {...prop} signin />}
        />
        <ProtectedRoute
          path="/dashboard/accounts"
          exact
          auth={isLoggedIn}
          component={Dashboard}
          accounts
          render={prop => <Dashboard {...prop} accounts />}
        />
        <ProtectedRoute
          path="/dashboard/transfer"
          exact
          auth={isLoggedIn}
          transfer
          component={Dashboard}
          render={prop => <Dashboard {...prop} transfer />}
        />
      </>
    ) : (
      <PeiPageLoader />
    );
  }
}
Routes.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired
};
const mapStateToProps = state => ({
  isLoggedIn: state.isLoggedIn
});
const mapDispatchToProps = dispatch => ({
  login: userId =>
    dispatch({ type: actions.USER_LOGGED_IN, payload: { uid: userId } })
});
Routes.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  login: PropTypes.func.isRequired
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Routes);
