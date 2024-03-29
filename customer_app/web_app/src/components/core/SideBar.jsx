import React from 'react';
import { useLocation } from 'react-router-dom';

import { Link } from '.';
import { pages } from '@pages';

import styles from '@styles';

export function SideBar({}) {
  const location = useLocation();
  const dashboardButton = (
    <Link
      to={pages.DASHBOARD_PAGE.path}
      className={pages.DASHBOARD_PAGE.path == location.pathname ? styles.sideButtonCurrent : styles.sideButton}>Dashboard</Link>
  );
  const checkingButton = (
    <Link
      to={pages.CHECKING_PAGE.path}
      className={pages.CHECKING_PAGE.path == location.pathname ? styles.sideButtonCurrent : styles.sideButton}>Checking</Link>
  );
  const savingsButton = (
    <Link
      to={pages.SAVINGS_PAGE.path}
      className={pages.SAVINGS_PAGE.path == location.pathname ? styles.sideButtonCurrent : styles.sideButton}>Savings</Link>
  );
  const loanButton = (
    <Link
      to={pages.LOAN_PAGE.path}
      className={pages.LOAN_PAGE.path == location.pathname ? styles.sideButtonCurrent : styles.sideButton}>Loan</Link>
  );
  return (
    <div className={styles.sideBar}>
      {dashboardButton}
      {checkingButton}
      {savingsButton}
      {loanButton}
    </div>
  );
};
