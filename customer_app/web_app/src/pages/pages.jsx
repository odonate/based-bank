import React from 'react';
import { useLocation, Route, Routes } from 'react-router-dom';

import { PublicElement, AuthElement } from '@components/routing';

import PublicPage from './PublicPage';
import RegisterPage from './RegisterPage';
import LoginPage from './LoginPage';
import DashboardPage from './DashboardPage';
import CheckingPage from './CheckingPage';

function Page(description, path, element) {
  const page = {
    description,
    path,
    element,
    route: <Route path={path} element={
      <PublicElement element={element}/>
    }/>
  };
  return page;
}

function AuthPage(description, path, element) {
  const page = {
    description,
    path,
    element,
    route: <Route path={path} element={
      <AuthElement element={element} />
    }/>
  };
  return page;
}

export const pages = {
  // Public pages.
  PUBLIC_PAGE: Page('Public', '/', <PublicPage/>),
  REGISTER_PAGE: Page('Register', '/register', <RegisterPage/>),
  LOGIN_PAGE: Page('Login', '/login', <LoginPage/>),

  // Auth pages.
  DASHBOARD_PAGE: AuthPage('Dashboard', '/dashboard', <DashboardPage/>),
  CHECKING_PAGE: AuthPage('Checking', '/checking', <CheckingPage/>),
};
