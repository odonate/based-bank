import React from 'react';

import { NavBar, SideBar } from '@components/core';
import { Manager } from '@components/savings';

import styles from '@styles';

const SavingsPage = (props) => {
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

export default SavingsPage;
