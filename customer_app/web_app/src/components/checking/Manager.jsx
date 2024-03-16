import React, { useState, useEffect } from 'react';

import { DepositModal } from '.';
import { SelectWalletModal } from '@components/core';

import { useMetaMask } from '@hooks';

import styles from '@styles';

const Manager = ({}) => {
  const { account } = useMetaMask();  
  const [isConnectOpen, setIsConnectOpen] = useState(false);
  const handleConnect = () => {
    setIsConnectOpen(true);
  };
  
  const topBar = (
    <div className={styles.managerTopBar}>
      <div>Connect your wallet to use Based Bank.</div>
      <button className={styles.managerTopBarButton} onClick={handleConnect}>Connect</button>
    </div>
  );

  const infoHeader = (
    <div className={styles.managerInfoHeader}>
      <h2>Checking Account</h2>
    </div>
  );

  const [isDepositOpen, setIsDepositOpen] = useState(false);
  const handleDeposit = () => {
    setIsDepositOpen(true);
  };
  const [isWithdrawalOpen, setIsWithdrawalOpen] = useState(false);
  const handleWithdrawal = () => {
    setIsWithdrawalOpen(true);
  };

  const infoBody = (
    <div className={styles.managerInfoBody}>
      <ol className={styles.managerInfoList}>
        <li>
          <span className={styles.managerInfoListNumber}>1.</span>
          {'By connecting your wallet you can make a deposit your based bank checking account.'}
        </li>
      </ol>
      <button onClick={handleDeposit}>DEPOSIT</button>
      <button onClick={handleWithdrawal}>WITHDRAWAL</button>
    </div>
  );

  return (
    <div className={styles.managerContainer}>

      {!account && topBar}
            
      <div className={styles.managerInfoContainer}>
        {infoHeader}
        {infoBody}
      </div>
      
      {isConnectOpen && <SelectWalletModal setIsOpen={setIsConnectOpen}/>}
      {isDepositOpen && <DepositModal setIsOpen={setIsDepositOpen}/>}
    </div>
  );
};

export { Manager };
