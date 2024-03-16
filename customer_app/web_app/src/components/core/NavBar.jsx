import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { pages } from '@pages';
import { Link } from '@components/core';
import { authActions } from '@actions';

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
  const login = useSelector(state => state.authService.login);

  const homeButton = <Link to={pages.PUBLIC_PAGE.path}>HOME</Link>;
  const dashboardButton = <Link to={pages.DASHBOARD_PAGE.path}>DASHBOARD</Link>;
  return (
    <div className={styles.navBarPages}>
      {homeButton}
      {login ? dashboardButton : ''}
    </div>
  );
};

const NavBarWallet = () => {
  const dispatch = useDispatch();
  const login = useSelector(state => state.authService.login);

  
  const handleLogout = () => {
    dispatch(authActions.clearLogin());
  };
  
  const registerButton = <Link to={pages.REGISTER_PAGE.path}>REGISTER</Link>;
  const loginButton = <Link to={pages.LOGIN_PAGE.path}>LOGIN</Link>;
  const logoutButton = <button onClick={handleLogout}>LOGOUT</button>;


  return (
    <div className={styles.navBarWallet}>
      {login ? (
        logoutButton
      ) : (
        <>
          {loginButton}
          {registerButton}
        </>
      )}
    </div>
  );
};
