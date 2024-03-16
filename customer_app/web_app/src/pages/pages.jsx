import React from 'react';
import { useLocation, Route, Routes } from 'react-router-dom';

import { PublicElement } from '@components/routing';

import PublicPage from './PublicPage';
import RegisterPage from './RegisterPage';
import LoginPage from './LoginPage';
import DepositPage from './DepositPage';

function Page(description, path, element, isPrivate, isConnect = false, isPublic = false) {
  const page = {
    description,
    path,
    element,
    route: <Route path={path} element={element} />,
  };
  
  page.route = isPublic ? (
    <Route path={path} element={
      <PublicElement element={element}/>
    }/>
  ) : page.route;
  return page;
}


export const pages = {
  // Public pages.
  PUBLIC_PAGE: Page('Public', '/', <PublicPage/>, false, false, true),
  REGISTER_PAGE: Page('Register', '/register', <RegisterPage/>, false, false, true),
  LOGIN_PAGE: Page('Login', '/login', <LoginPage/>, false, false, true),
  DEPOSIT_PAGE: Page('Deposit', '/deposit', <DepositPage/>, false, false, true),

};
