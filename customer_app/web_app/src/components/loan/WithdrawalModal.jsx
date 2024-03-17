import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import BigNumber from 'bignumber.js';

import { defluxActions } from '@actions';
import { shiftDecimals } from '@utils';
import { networkConstants } from '@constants';
import { useMetaMask } from '@hooks';

import styles from '@styles';

const accountId = '35daf0e3-f4f4-5e98-8e3d-7dae966a8bbb';

const WithdrawalModal = ({ setIsOpen }) => {
  const { account } = useMetaMask();
  const dispatch = useDispatch();
  const login = useSelector(state => state.authService.login);

  const [withdrawal, setWithdrawal] = useState({
    accountId: accountId, // TODO: get the account ID.
    tokenId: '0x75faf114eafb1bdbe2f0316df893fd58ce46aa4d',
    amount: '',
    toAddress: account,
  });
  
  const modalHeader = ( 
    <div className={styles.modalHeader}>
      <div className={styles.modalHeaderContainer}>
        <div className={styles.modalHeaderContent}>
          <div>Withdraw USDC</div>
        </div>
        <button onClick={() => setIsOpen(false)}>X</button>
      </div>
    </div>
  );

  const handleWithdrawal = async (e) => {
    if (!withdrawal.amount) return;
    dispatch(defluxActions.createWithdrawal(withdrawal));
    console.log("Create Withdrawal", withdrawal);
    setIsOpen(false);
  };
  const withdrawalButton = <button onClick={handleWithdrawal} className={styles.actionButton}>WITHDRAW</button>;

  return (
    <div>
      <div className={styles.modalOverlay} onClick={() => setIsOpen(false)} />
      <div className={styles.modal}>
        <div className={styles.modalContent}>
          {modalHeader}

          <div>
            <WithdrawalInput withdrawal={withdrawal} setWithdrawal={setWithdrawal}/>
            <div className={styles.divider}/>
            
            <div className={styles.actionButtonContainer}>
              {withdrawalButton}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const WithdrawalInput = ({ withdrawal, setWithdrawal }) => {
  const [isClicked, setIsClicked] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setWithdrawal({
      ...withdrawal,
      [name]: value,
    });
  };

  return (
    <div className={styles.gridSection}>
      <div className={styles.gridLabel}>Token:</div>
      <div className={styles.gridValue}>USDC</div>
        
      <div className={styles.gridLabel}>Amount:</div>
      <div className={styles.gridValue}>
        <div className={isClicked ? `${styles.inputContainer} ${styles.inputContainerClicked}` : `${styles.inputContainer}`}>
          <input
            type="text"
            name="amount"
            placeholder={'0'}
            value={withdrawal ? withdrawal.amount : ''}
            onChange={handleChange}
            autoComplete='off'
            className={styles.input}
            />
          </div>
      </div>
    </div>
  );
};

export { WithdrawalModal };
