import React from 'react';

import { SplashMain } from '.';

import styles from '@styles';

const Splash = () => {
    return (
    <div className={styles.splashContainer}>
      <div className={styles.splashSectionOdd}>
        <SplashMain/>
      </div>
    </div>
  );
};

export { Splash };

