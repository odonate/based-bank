import React from 'react';
import {
  Routes,
  BrowserRouter as Router,
} from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';

import { pages } from '../pages';

import { history } from '../helpers';

import styles from '../styles';

function App() {
  const dispatch = useDispatch();
  history.listen((location, action) => {
    // do some stuff
  });

  const routes = (
    <Routes>
      {/* Public Pages */}
      {pages.PUBLIC_PAGE.route}
      {pages.REGISTER_PAGE.route}
      {pages.LOGIN_PAGE.route}
      {pages.DASHBOARD_PAGE.route}
      {pages.CHECKING_PAGE.route}
      {pages.SAVINGS_PAGE.route}
      {pages.LOAN_PAGE.route}
    </Routes>
  );

  return (
    <div className={styles.app}>
      <Router history={history}>
        {routes}
      </Router>
    </div>
  );
}

function mapStateToProps(state) {
  return {};
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App };
