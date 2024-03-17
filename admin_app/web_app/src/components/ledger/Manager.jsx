import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { LedgerTable } from '.';
import { defluxActions } from '@actions';
import styles from '@styles';

const Manager = ({}) => {
  const dispatch = useDispatch();
  const balances = useSelector(state => state.defluxService.balances);
  useEffect(() => {
    dispatch(defluxActions.listBalances([
      '5daae5cd-6dfb-5559-aea8-8d662c4abac0',
      '6340d364-c2c3-5d60-b82f-57f868697496',
    ]));
  }, []);

  
  const infoHeader = (
    <div className={styles.managerInfoHeader}>
      <h2>Internal Bank Ledger</h2>
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

  const convertBalances = (balances) => {
    let result = [];

    balances.forEach((item) => {
      const denominations = Object.keys(item.denominationToAvailableBalance);
      denominations.forEach((denomination) => {
        result.push({
          venueId: item.venueId,
          accountId: item.accountId,
          denomination: denomination,
          effectiveBalance: item.denominationToEffectiveBalance[denomination],
          availableBalance: item.denominationToAvailableBalance[denomination],
        });
      });
    });
    return result;
  };

  const newBalances = convertBalances(balances);
  console.log(newBalances);

  return (
    <div className={styles.managerContainer}>
      <div className={styles.managerInfoContainer}>
        {infoHeader}
        {infoBody}
      </div>

      
      <div>
        <LedgerTable balances={newBalances}/>
      </div>
    </div>
  );
};

export { Manager };
