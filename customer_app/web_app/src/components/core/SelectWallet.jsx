import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import CoinbaseLogo from '@images/wallets/coinbase.png';
import MetamaskLogo from '@images/wallets/metamask.png';
import WalletIcon from '@images/wallet.png';

import { useMetaMask } from '@hooks';

import styles from '@styles';

const SelectWalletModal = ({ setIsOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { connect } = useMetaMask();

  const handleConnect = async () => {
    await connect();
    setIsOpen(false);
    if (location.pathname == "/connect") {
      navigate(location.state.from.pathname, { state: { from: location }});
    } else {
      navigate(location.pathname, { state: { from: location }});
    }
  };

  return (
    <div>
      <div className={styles.modalOverlay} onClick={() => setIsOpen(false)} />
      <div className={styles.modal}>
        <div className={styles.modalContent}>
          <div className={styles.modalHeader}>
            <div className={styles.modalHeaderContainer}>
              <div className={styles.modalHeaderContent}>
                <img src={WalletIcon} style={{ width: 32, height: 32, padding: '5px' }} />
                <div>Select Wallet</div>
              </div>
              <button onClick={() => setIsOpen(false)}>X</button>
            </div>
          </div>
          <div>
            <div className={styles.modalBodyHeader}>Choose a wallet to connect to...</div>
            <div className={styles.modalBodyButtonHolder}>
              <button onClick={handleConnect} className={styles.modalBodyButton}>
                <img src={MetamaskLogo} className={styles.modalBodyButtonLogo} />
                <div>METAMASK</div>
              </button>
              <button className={styles.modalBodyButton}>
                <img src={CoinbaseLogo} className={styles.modalBodyButtonLogo} />
                <div>(coming soon!)</div>
              </button>
            </div>
            <div className={styles.modalBodyFooter}>
              By using DeFlux you agree to our Terms & Conditions.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { SelectWalletModal };
