import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import BigNumber from 'bignumber.js';

import { defluxActions } from '@actions';
import { shiftDecimals } from '@utils';
import { networkConstants } from '@constants';
import { useMetaMask } from '@hooks';

import styles from '@styles';

const accountId = '5daae5cd-6dfb-5559-aea8-8d662c4abac0';

const RepayModal = ({ setIsOpen }) => {
  const { account, networkId } = useMetaMask();
  const dispatch = useDispatch();
  const login = useSelector(state => state.authService.login);

  const [repay, setRepay] = useState({
    accountId: accountId, // TODO: get the account ID.
    tokenId: '0x75faf114eafb1bdbe2f0316df893fd58ce46aa4d',
    amount: '',
    fromAddress: account,
    fromVenueId: networkConstants.ID_TO_VENUE[networkId],
  });
  
  const { useApprovedAmount, useTokenApproval } = useMetaMask();
  const gatewayAddress = networkConstants.ID_TO_GATEWAY[networkId];
  const { approvedAmount, setApprovedAmount } = useApprovedAmount(repay.tokenId, gatewayAddress);
  console.log("APPROVED AMOUNT:", approvedAmount);
  const { isApproving, setIsApproving, error, approveTokens } = useTokenApproval(repay.tokenId);
  
  const modalHeader = ( 
    <div className={styles.modalHeader}>
      <div className={styles.modalHeaderContainer}>
        <div className={styles.modalHeaderContent}>
          <div>Repay USDC</div>
        </div>
        <button onClick={() => setIsOpen(false)}>X</button>
      </div>
    </div>
  );

  const [isApproved, setIsApproved] = useState(false);
  const handleRepay = async (e) => {
    if (isApproving || !repay.amount) return;
    setIsApproving(true);

    const shifted = shiftDecimals(repay.amount, 6);
    const decimalAmount = new BigNumber(shifted);
    const decimalApprovedAmount = new BigNumber(approvedAmount || '0');
    console.log("Shifted:", shifted);
    console.log("AMOUNT:", decimalAmount);
    console.log("APPROVED:", decimalApprovedAmount);
    try {
      let approveTxHash = '';

      if (decimalAmount.lte(decimalApprovedAmount)) {
        // Already approved. Repay.
        console.log("Already approved:", decimalAmount, " < ", decimalApprovedAmount);
        dispatch(defluxActions.createRepay(repay));
      } else {
        // Need to approve. Then repay.
        approveTxHash = await approveTokens(gatewayAddress, shifted);
        dispatch(defluxActions.createRepay(repay));
      }
    } catch (error) {
      console.error("Error approving ERC20 token:", error);
    } finally {
      setIsApproving(false);
      setIsOpen(false);
    }
    
    console.log("Create Repay", repay);
    setIsApproved(true);
  };
  const repayButton = <button onClick={handleRepay} className={styles.actionButton}>REPAY</button>;

  return (
    <div>
      <div className={styles.modalOverlay} onClick={() => setIsOpen(false)} />
      <div className={styles.modal}>
        <div className={styles.modalContent}>
          {modalHeader}

          <div>
            <RepayInput repay={repay} setRepay={setRepay}/>
            <div className={styles.divider}/>

            {isApproving ? <Approving/> : ''}
            
            <div className={styles.actionButtonContainer}>
              {repayButton}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const RepayInput = ({ repay, setRepay }) => {
  const [isClicked, setIsClicked] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRepay({
      ...repay,
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
            value={repay ? repay.amount : ''}
            onChange={handleChange}
            autoComplete='off'
            className={styles.input}
            />
          </div>
      </div>
    </div>
  );
};

const Approving = ({ repay }) => {
  return (
    <div>
      Approving...
    </div>
  );
};

export { RepayModal };
