import React from 'react';

// import { Splash } from '@components/splash';
import { NavBar } from '@components/core';

import styles from '@styles';

const PublicPage = (props) => {
  return (
    <div className={styles.container}>
      <NavBar/>
      {/* <Splash/> */}
    </div>
  );
};

export default PublicPage;
