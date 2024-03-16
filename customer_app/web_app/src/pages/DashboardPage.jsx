import React from 'react';

import { NavBar, SideBar } from '@components/core';
import { Manager } from '@components/dashboard';

import styles from '@styles';

const DashboardPage = (props) => {
  return (
    <div className={styles.container}>
      <NavBar/>
      <div className={styles.sideBarContainer}>
        <SideBar/>
        <Manager/>
      </div>
    </div>
  );
};

export default DashboardPage;
