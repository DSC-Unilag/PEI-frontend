import React, { Component } from 'react';
import { connect } from 'react-redux';
import PeiInput from '../elements/PeiInput';
import PeiLabel from '../elements/PeiLabel';
import PeiButton from '../elements/PeiButton';
import TransferableAccounts from '../TransferableAccounts';
import Styles from './index.module.css';
import { getUser, getAllAccounts } from '../../api';

class Transfer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isValidating: false,
      username: null,
      senderValidated: false,
      recipientData: [],
      userData: []
    };
    this.validateUser = this.validateUser.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  validateUser(e) {
    const { username } = this.state;
    const { uid } = this.props;
    e.preventDefault();
    this.setState({
      isValidating: true
    });
    fetch(getUser, {
      method: 'POST',
      cors: true,
      body: JSON.stringify({ username }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log(data.data[0].uid);
        fetch(getAllAccounts, {
          method: 'POST',
          cors: true,
          body: JSON.stringify({ user_id: data.data[0].uid }),
          headers: {
            'Content-Type': 'application/json'
          }
        })
          .then(info => info.json())
          .then(dat => {
            console.log(dat);
            this.setState({
              recipientData: [...dat.data]
            });
          })
          .then(r => {
            const dataBody = { user_id: uid };
            fetch(getAllAccounts, {
              method: 'POST',
              cors: true,
              body: JSON.stringify(dataBody),
              headers: {
                'Content-Type': 'application/json'
              }
            })
              .then(i => i.json())
              .then(n => {
                this.setState({
                  userData: [...n.data],
                  isValidating: false,
                  senderValidated: true
                });
              });
          });
      })
      .catch(err => {
        this.setState({
          isValidating: false
        });
        console.log(err);
      });
  }

  render() {
    const {
      isValidating,
      senderValidated,
      recipientData,
      userData
    } = this.state;
    console.log(recipientData);
    return (
      <>
        <div className={Styles.main}>
          <h1>Complete the steps below</h1>
          <div className={Styles.transferDiv}>
            <PeiLabel purple>Select User You Wish to Transfer to</PeiLabel>
            <PeiInput
              type="text"
              purple
              placeholder="type in recipient username"
              name="username"
              onKeyUp={this.handleChange}
            />
            <br />
            <div className={Styles.button}>
              <PeiButton onClick={this.validateUser}>
                {isValidating ? (
                  <img
                    src="/images/Roll.svg"
                    alt="roll"
                    className={Styles.loader}
                  />
                ) : (
                  'Validate User'
                )}
              </PeiButton>
              {senderValidated &&
                (recipientData.length === 0 ? (
                  <h3>No accounts for this user</h3>
                ) : (
                  <div>
                    <h3>Recipient{"'"}s Accounts</h3>
                    {recipientData.map(({ name, acc_type }) => (
                      <TransferableAccounts name={name} acc={acc_type} />
                    ))}
                  </div>
                ))}
              {userData.length > 0 && (
                <>
                  <h3>Sender{"'"}s Accounts</h3>
                  {userData.map(({ name, acc_type }) => (
                    <TransferableAccounts name={name} acc={acc_type} />
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
}
const mapStateToProps = state => ({
  isLoggedIn: state.isLoggedIn,
  uid: state.uid
});
export default connect(mapStateToProps)(Transfer);
