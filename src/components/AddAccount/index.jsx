import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Styles from './index.module.css';
import PeiButton from '../elements/PeiButton';
import PeiInput from '../elements/PeiInput';
import PeiLabel from '../elements/PeiLabel';
import PeiHeading from '../elements/PeiHeading';
import PeiToast from '../elements/PeiToast';
import { createAccount } from '../../api';

class LoadAccounts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSubmitted: false,
      isLoading: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit(e) {
    const { uid } = this.props;
    e.preventDefault();
    const body = { ...this.state, uid: uid };
    this.setState({
      isLoading: true
    });
    fetch(createAccount, {
      method: 'POST',
      cors: true,
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
        this.setState({
          isLoading: false,
          isSubmitted: true
        });
        console.log('account added', data);
      })
      .catch(err => {
        this.setState({
          isLoading: false
        });
        console.log(err);
      });
  }

  render() {
    const { isLoading, isSubmitted } = this.state;
    return (
      <div className={Styles.container}>
        {isSubmitted && (
          <PeiToast>
            <h2>Account Added Sucessfully</h2>
            <br />
            <Link to="/dashboard/accounts">
              <PeiButton>Go To Accounts</PeiButton>
            </Link>
          </PeiToast>
        )}
        <PeiHeading purple>Fill In the details below</PeiHeading>
        <form>
          <PeiLabel purple>Account Name(Alias)</PeiLabel>
          <br />
          <PeiInput
            name="name"
            purple
            type="text"
            placeholder="A name you can remeber"
            onKeyUp={this.handleChange}
          />
          <br />
          <PeiLabel purple>Card Number</PeiLabel>
          <br />
          <PeiInput
            purple
            type="number"
            placeholder="1234 5678 9101 12131"
            name="card_number"
            onKeyUp={this.handleChange}
          />
          <br />
          <PeiLabel purple>CVV</PeiLabel>
          <br />
          <PeiInput
            name="cvv"
            onKeyUp={this.handleChange}
            purple
            type="number"
            placeholder="123"
          />
          <br />
          <PeiLabel purple>Expiration Date</PeiLabel>
          <br />
          <PeiInput
            name="exp_date"
            onKeyUp={this.handleChange}
            purple
            type="number"
            placeholder="12/34"
          />
          <br />
          <PeiLabel purple>Account Type</PeiLabel>
          <br />
          <PeiInput
            name="acc_type"
            onKeyUp={this.handleChange}
            purple
            type="tect"
            placeholder="e.g USD"
          />
          {/* <PeiLabel purple>Expiration Date</PeiLabel>
          <br />
          <PeiInput purple type="number" placeholder="12/34" />
          <br /> */}
          <PeiButton onClick={this.handleSubmit}>
            {isLoading ? (
              <img
                src="/images/Roll.svg"
                alt="roll"
                className={Styles.loader}
              />
            ) : (
              'ADD ACCOUNT'
            )}
          </PeiButton>
        </form>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  uid: state.uid
});
export default connect(mapStateToProps)(LoadAccounts);
