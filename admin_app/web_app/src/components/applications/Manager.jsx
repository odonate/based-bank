import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { defluxActions } from '@actions';
import { ProductApplicationTable } from '.';

import styles from '@styles';

const Manager = ({}) => {
  const dispatch = useDispatch();
  const productApplications = useSelector(state => state.defluxService.productApplications);
  useEffect(() => {
    dispatch(defluxActions.listProductApplications());
  }, []);

  const infoHeader = (
    <div className={styles.managerInfoHeader}>
      <h2>Product Applications</h2>
    </div>
  );
  
  const infoBody = (
    <div className={styles.managerInfoBody}>
      <ol className={styles.managerInfoList}>
        <li>
          <span className={styles.managerInfoListNumber}>1.</span>
          {'The table below is for the evaluation of product applications by customers.'}
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

      <div>
        <ProductApplicationTable productApplications={productApplications}/>
      </div>
    </div>
  );
};

export { Manager };
