import React from 'react';
import { useLocation, Route, Routes } from 'react-router-dom';

import { PublicElement, AuthElement } from '@components/routing';

import LoginPage from './LoginPage';
import DashboardPage from './DashboardPage';
import ProductPage from './ProductPage';
import ApplicationsPage from './ApplicationsPage';

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
  PRODUCT_PAGE: AuthPage('Product', '/product', <ProductPage/>),
  APPLICATIONS_PAGE: AuthPage('Applications', '/applications', <ApplicationsPage/>),
};
