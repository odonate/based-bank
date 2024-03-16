import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import BigNumber from 'bignumber.js';

import { shiftDecimals } from '@utils';

import { networkConstants } from '@constants';
import styles from '@styles';

import { useMetaMask } from '@hooks';

const DepositModal = ({ setIsOpen }) => {
  const { account } = useMetaMask();
  const dispatch = useDispatch();
  const login = useSelector(state => state.authService.login);

  const [deposit, setDeposit] = useState({
    accountId: "", // TODO:
    tokenId: "0x75faf114eafb1bdbe2f0316df893fd58ce46aa4d",
    amount: "",
    fromAddress: account,
  });
  
  const { useApprovedAmount, useTokenApproval, networkId } = useMetaMask();
  const gatewayAddress = networkConstants.ID_TO_GATEWAY[networkId];
  const { approvedAmount, setApprovedAmount } = useApprovedAmount(deposit.tokenId, gatewayAddress);
  console.log("APPROVED AMOUNT:", approvedAmount);
  const { isApproving, setIsApproving, error, approveTokens } = useTokenApproval(deposit.tokenId);
  
  const modalHeader = ( 
    <div className={styles.modalHeader}>
      <div className={styles.modalHeaderContainer}>
        <div className={styles.modalHeaderContent}>
          <div>Deposit USDC</div>
        </div>
        <button onClick={() => setIsOpen(false)}>X</button>
      </div>
    </div>
  );

  const [isApproved, setIsApproved] = useState(false);
  const handleDeposit = async (e) => {
    if (isApproving || !deposit.amount) return;
    setIsApproving(true);

    const amount = shiftDecimals(deposit.amount, 6);
    const decimalAmount = new BigNumber(amount);
    const decimalApprovedAmount = new BigNumber(approvedAmount || '0');
    console.log("AMOUNT:", decimalAmount);
    console.log("APPROVED:", decimalApprovedAmount);
    try {
      let approveTxHash = '';

      if (decimalAmount.lte(decimalApprovedAmount)) {
        // Already approved. Deposit.
        console.log("Already approved:", decimalAmount, " < ", decimalApprovedAmount);
      } else {
        // Need to approved. Then deposit.
        approveTxHash = await approveTokens(gatewayAddress, amount);
      }
    } catch (error) {
      console.error("Error approving ERC20 token:", error);
    } finally {
      setIsApproving(false);
    }
    
    console.log("Create Deposit", deposit);
    setIsApproved(true);
  };
  const depositButton = <button onClick={handleDeposit} className={styles.actionButton}>DEPOSIT</button>;

  return (
    <div>
      <div className={styles.modalOverlay} onClick={() => setIsOpen(false)} />
      <div className={styles.modal}>
        <div className={styles.modalContent}>
          {modalHeader}

          <div>
            <DepositInput deposit={deposit} setDeposit={setDeposit}/>
            <div className={styles.divider}/>

            {isApproving ? <Approving/> : ''}
            
            <div className={styles.actionButtonContainer}>
              {depositButton}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const DepositInput = ({ deposit, setDeposit }) => {
  const [isClicked, setIsClicked] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDeposit({
      ...deposit,
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
            value={deposit ? deposit.amount : ''}
            onChange={handleChange}
            autoComplete='off'
            className={styles.input}
            />
          </div>
      </div>
    </div>
  );
};

const Approving = ({ deposit }) => {
  return (
    <div>
      Approving...
    </div>
  );
};

export { DepositModal };
