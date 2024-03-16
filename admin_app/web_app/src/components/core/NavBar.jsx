import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { pages } from '@pages';
import { Link, NetworkDropDown } from '@components/core';
import { authActions } from '@actions';

import styles from '@styles';

export function NavBar({}) {

  const navBarPages = <NavBarPages/>;

  return (
    <div className={styles.navBar}>
      {navBarPages}
    </div>
  );
}

const NavBarPages = () => {
  const login = useSelector(state => state.authService.login);

  const homeButton = <Link to={pages.LOGIN_PAGE.path}>HOME</Link>;
  const dashboardButton = <Link to={pages.DASHBOARD_PAGE.path}>DASHBOARD</Link>;
  return (
    <div className={styles.navBarPages}>
      {homeButton}
      {login ? dashboardButton : ''}
    </div>
  );
};
