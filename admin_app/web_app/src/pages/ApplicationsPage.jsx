import React from 'react';

import { NavBar, SideBar } from '@components/core';
import { Manager } from '@components/applications';

import styles from '@styles';

const ApplicationsPage = (props) => {
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

export default ApplicationsPage;
