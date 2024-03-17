import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { RepayModal, WithdrawalModal } from '.';
import { SelectWalletModal } from '@components/core';

import { defluxActions } from '@actions';
import { useMetaMask } from '@hooks';

import styles from '@styles';

const accountId = '35daf0e3-f4f4-5e98-8e3d-7dae966a8bbb';

const Manager = ({}) => {
  const { account } = useMetaMask();
  const dispatch = useDispatch();
  const balances = useSelector(state => state.defluxService.balances);
  const productApplication = useSelector(state => state.defluxService.productApplication);
  useEffect(() => {
    dispatch(defluxActions.listBalances(accountId));
    dispatch(defluxActions.getProductApplication(accountId));
  }, []);
  
  const [isConnectOpen, setIsConnectOpen] = useState(false);
  const handleConnect = () => {
    setIsConnectOpen(true);
  };
  
  const topBar = (
    <div className={styles.managerTopBar}>
      <div>Connect your wallet to use Based Bank.</div>
      <button className={styles.actionButton} onClick={handleConnect}>Connect</button>
    </div>
  );

  const handleApplication = () => {
    const application = {
      productId: '22591cc4-ecd1-5cec-82ac-5323adc06962',
      accountId: accountId,
    };
    console.log(application);
    dispatch(defluxActions.createProductApplication(application));
  };
  const infoHeader = (
    <div className={styles.managerInfoHeader}>
      <h2>Loan Account</h2>
      {productApplication ? '' : <button onClick={handleApplication} className={styles.actionButton}>Apply</button>}
    </div>
  );

  const [isRepayOpen, setIsRepayOpen] = useState(false);
  const handleRepay = () => {
    setIsRepayOpen(true);
  };
  const [isWithdrawalOpen, setIsWithdrawalOpen] = useState(false);
  const handleWithdrawal = () => {
    setIsWithdrawalOpen(true);
  };

  console.log("PRODUCT APP", productApplication);
  const infoBody = (
    <div className={styles.managerInfoBody}>
      <ol className={styles.managerInfoList}>
        <li>
          <span className={styles.managerInfoListNumber}>1.</span>
          {'By connecting your wallet you can make a apply for aloan with Based Bank.'}
        </li>
      </ol>

      {productApplication && <div>Application Status: {productApplication.status}</div>}

      {productApplication && productApplication.status == "approved" ? <button className={styles.actionButton} onClick={handleRepay}>REPAY</button> : ''}
      {productApplication && productApplication.status == "approved" ? <button className={styles.actionButton} onClick={handleWithdrawal}>WITHDRAWAL</button> : '' }

      <div>
        {balances && balances.length > 0 && (
          <div>
            <div>Balance: {balances[0]?.denominationToEffectiveBalance["0x75faf114eafb1bdbe2f0316df893fd58ce46aa4d"]}</div>
            <div>Available Balance: {balances[0]?.denominationToAvailableBalance["0x75faf114eafb1bdbe2f0316df893fd58ce46aa4d"]}</div>
          </div>
        )}
      </div>
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
      {isRepayOpen && <RepayModal setIsOpen={setIsRepayOpen}/>}
      {isWithdrawalOpen && <WithdrawalModal setIsOpen={setIsWithdrawalOpen}/>}
    </div>
  );
};

export { Manager };
