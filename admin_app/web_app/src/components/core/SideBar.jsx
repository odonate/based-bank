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
  const productButton = (
    <Link
      to={pages.PRODUCT_PAGE.path}
      className={pages.PRODUCT_PAGE.path == location.pathname ? styles.sideButtonCurrent : styles.sideButton}>Products</Link>
  );
  const applicationsButton = (
    <Link
      to={pages.APPLICATIONS_PAGE.path}
      className={pages.APPLICATIONS_PAGE.path == location.pathname ? styles.sideButtonCurrent : styles.sideButton}>Applications</Link>
  );
  return (
    <div className={styles.sideBar}>
      {dashboardButton}
      {productButton}
      {applicationsButton}
    </div>
  );
};
