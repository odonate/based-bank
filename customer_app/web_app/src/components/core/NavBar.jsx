import React, { useState } from 'react';

import { pages } from '@pages';
import { Link } from '@components/core';

import styles from '@styles';

export function NavBar({}) {

  const navBarPages = <NavBarPages/>;
  const navBarWallet = <NavBarWallet/>;

  return (
    <div className={styles.navBar}>
      {navBarPages}
      {navBarWallet}
    </div>
  );
}

const NavBarPages = () => {
  const homeButton = <Link to={pages.PUBLIC_PAGE.path}>HOME</Link>;
  const registerButton = <Link to={pages.REGISTER_PAGE.path}>REGISTER</Link>;

  return (
    <div className={styles.navBarPages}>
      {homeButton}
      {registerButton}
    </div>
  );
};

const NavBarWallet = () => {
  return <div/>;
};
