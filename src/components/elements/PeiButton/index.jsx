import React from 'react';
const PeiButton = ({ children, type, onClick }) => (
  <button type={type} onClick={onClick}>
    {children}
  </button>
);
export default PeiButton;
