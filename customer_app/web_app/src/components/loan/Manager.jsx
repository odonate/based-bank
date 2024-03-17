import React, { useState, useEffect } from 'react';

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
      <h2>Loan Account</h2>
    </div>
  );
  
  const infoBody = (
    <div className={styles.managerInfoBody}>
      <ol className={styles.managerInfoList}>
        <li>
          <span className={styles.managerInfoListNumber}>1.</span>
          {'By connecting your wallet you can make a apply for aloan with Based Bank.'}
        </li>
      </ol>
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
    </div>
  );
};

export { Manager };
