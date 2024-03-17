import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// import { productActions } from '@actions';

import { CreateModal } from '.';

import styles from '@styles';

const Manager = ({}) => {
  const dispatch = useDispatch();
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const header = (    
    <div className={styles.apiMgmtInfoHeader}>
      <h2>Product Management</h2>
      <button onClick={() => setIsCreateOpen(true)} className={styles.actionButton}>Create Product</button>
    </div>
  );
  
  const body = (
    <div className={styles.apiMgmtInfoBody}>
      <ol className={styles.apiMgmtInfoList}>
        <li>
          <span className={styles.apiMgmtInfoListNumber}>1.</span>
          {'Products are chain-agnostic ...'}
        </li>
        <li>
          <span className={styles.apiMgmtInfoListNumber}>2.</span>
          {'You can deploy a product across many EVM chains'}
        </li>
        <li>
          <span className={styles.apiMgmtInfoListNumber}>3.</span>
          {'Reserve ratio defines the capital adequacy ratio for the bank\'s internal product'}
        </li>
        <li>
          <span className={styles.apiMgmtInfoListNumber}>4.</span>
          {'Borrowers from a financial product will be charged an interest rate.'}
        </li>
      </ol>
    </div>
  );

  return (
    <div className={styles.managerContainer}>
      <div className={styles.managerInfoContainer}>
        {header}
        {body}
      </div>

      Table here

      {isCreateOpen && <CreateModal setIsCreateOpen={setIsCreateOpen}/>}
    </div>
  );
};

export { Manager }
