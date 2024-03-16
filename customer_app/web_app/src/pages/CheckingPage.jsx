import React from 'react';

import { NavBar, SideBar } from '@components/core';
import { Manager } from '@components/checking';

import styles from '@styles';

const CheckingPage = (props) => {
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

export default CheckingPage;
