import React from 'react';

const PeiButton = ({ children, type, onClick }) => (
  // eslint-disable-next-line react/button-has-type
  <button type={type} onClick={onClick}>
    {children}
  </button>
);
export default PeiButton;
