import React from 'react';

import { NavBar, SideBar } from '@components/core';
import { Manager } from '@components/loan';

import styles from '@styles';

const LoanPage = (props) => {
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

export default LoanPage;
