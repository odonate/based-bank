import React, { useState, useEffect } from 'react';

import styles from '@styles';

const Manager = ({}) => {  

  const infoHeader = (
    <div className={styles.managerInfoHeader}>
      <h2>Dashboard</h2>
    </div>
  );
  
  const infoBody = (
    <div className={styles.managerInfoBody}>
      <ol className={styles.managerInfoList}>
        <li>
          <span className={styles.managerInfoListNumber}>1.</span>
          {'Manage bank from here.'}
        </li>
      </ol>
    </div>
  );

  return (
    <div className={styles.managerContainer}>
      <div className={styles.managerInfoContainer}>
        {infoHeader}
        {infoBody}
      </div>      
    </div>
  );
};

export { Manager };
