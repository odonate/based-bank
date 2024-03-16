import React from 'react';

import SplashImg from '@images/splash-ai-1.webp';

import styles from '@styles';

const SplashMain = ({ }) => {
  return (
    <div className={styles.splashSectionContainer}>
      <div className={styles.splashSectionWrap}>
        
        <div className={styles.splashSubSectionContainer}>
           <div className={styles.splashImgContainer}>
            <img src={SplashImg} className={styles.splashImg}/>
          </div>
        </div>
        
        <div className={styles.splashSubSectionContainer}>
          <div style={{alignItems: 'left'}}>
            <p className={styles.splashMainTitle}>Borderless Banking on Base</p>
            <p className={styles.splashMainSubTitle}>And any other EVM chain</p>
          </div>
        </div>
      </div>
      <p className={styles.splashMainWords}>Frictionless cross-border payments. NFT Mortgages.</p>
    </div>
  );
};

export { SplashMain };
