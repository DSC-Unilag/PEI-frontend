import React from 'react';
import Styles from './index.module.css';
import PeiButton from '../elements/PeiButton';
import PeiInput from '../elements/PeiInput';
import PeiLabel from '../elements/PeiLabel';
import PeiHeading from '../elements/PeiHeading';

const LoadAccounts = () => (
  <div className={Styles.container}>
    <PeiHeading purple>Fill In the details below</PeiHeading>
    <form>
      <PeiLabel purple>Card Number</PeiLabel>
      <br />
      <PeiInput purple type="number" placeholder="1234 5678 9101 12131" />
      <br />
      <PeiLabel purple>CVV</PeiLabel>
      <br />
      <PeiInput purple type="number" placeholder="123" />
      <br />
      <PeiLabel purple>Expiration Date</PeiLabel>
      <br />
      <PeiInput purple type="number" placeholder="12/34" />
      <br />
      {/* <PeiLabel purple>Expiration Date</PeiLabel>
      <br />
      <PeiInput purple type="number" placeholder="12/34" />
      <br /> */}
      <PeiButton>ADD ACCOUNT</PeiButton>
    </form>
  </div>
);
export default LoadAccounts;
