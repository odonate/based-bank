import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

export const PublicElement = ({ element }) => {
  const location = useLocation();
  if (!location.state) { // First landing.
    const state = { from: location };
    return <Navigate to={location.pathname} state={state} replace />;
  }
  return <div>{element}</div>;
};
