import React from 'react';
import { useLocation, Route, Routes } from 'react-router-dom';

import { PublicElement, AuthElement } from '@components/routing';

import LoginPage from './LoginPage';
import DashboardPage from './DashboardPage';

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
  LOGIN_PAGE: Page('Login', '/', <LoginPage/>),

  // Auth pages.
  DASHBOARD_PAGE: AuthPage('Dashboard', '/dashboard', <DashboardPage/>),
};