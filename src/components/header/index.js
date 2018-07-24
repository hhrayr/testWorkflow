import React from 'react';
import logo from '../../logo.png';
import './header.scss';

const Header = () => {
  return (
    <div className="app-header">
      <img src={logo} className="app-logo" alt="logo" />
      <h2>Welcome</h2>
    </div>
  );
};

export default Header;
