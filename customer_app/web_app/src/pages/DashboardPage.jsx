import React from 'react';

import { NavBar } from '@components/core';
// import { DashboardManager } from '@components/account';

import styles from '@styles';

const AccountPage = (props) => {
  return (
    <div className={styles.container}>
      <NavBar/>
      {/* <DashboardManager/> */}
    </div>
  );
};

export default AccountPage;
