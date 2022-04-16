import React from "react";
import logo from "../assets/img/logo.png";

const Header = () => {
  return (
    <header className="header">
      <img src={logo} alt="" className="header-logo" />
      <a href="" className="button button--outline header-link">
        Join Airdrop
      </a>
    </header>
  );
};

export default Header;
