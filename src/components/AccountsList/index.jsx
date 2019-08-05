/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import Styles from './index.module.css';

const AccountsList = ({ fade, card_number, cvv, exp_date, name, acc_type }) =>
  fade ? (
    <div className={Styles.containerFade}>
      <p>loading...</p>
    </div>
  ) : (
    <div className={Styles.container}>
      <h1>{name}</h1>
      <p>
        <span>Card Number</span>
        {card_number}
      </p>
      <p>
        <span>CVV</span>
        {cvv}
      </p>
      <p>
        <span>Account Type</span>
        {acc_type}
      </p>
      <p>
        <span>Expiration Date</span>
        {exp_date}
      </p>
    </div>
  );

AccountsList.propTypes = {
  fade: PropTypes.bool,
  card_number: PropTypes.string,
  name: PropTypes.string,
  exp_date: PropTypes.string,
  acc_type: PropTypes.string,
  cvv: PropTypes.string
};

AccountsList.defaultProps = {
  fade: false,
  card_number: null,
  name: null,
  exp_date: null,
  acc_type: null,
  cvv: null
};
export default AccountsList;
