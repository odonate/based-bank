import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { pages } from '@pages';
import { authActions } from '@actions';

export const AuthElement = ({ element }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const login = useSelector(state => state.authService.login);
  useEffect(() => {
    // Retrieve login from cache, if exists.
    dispatch(authActions.getLogin());
  }, []);
  if (!login) {
    const state = { from: location };
    return <Navigate to={pages.PUBLIC_PAGE.path} state={state} replace />;
  }
  return <div>{element}</div>;
};
