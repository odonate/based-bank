import React, { useState } from 'react';
import { Menu, MenuItem, MenuButton } from '@szhsin/react-menu';

import { networkConstants } from '@constants';

import { switchNetwork } from '@utils';

import { useMetaMask } from '@hooks';

import styles from '@styles';

function NetworkDropDown(props) {
  const { networkId, library } = useMetaMask();
  const networkIds = networkConstants.CHAIN_IDS;
  const networkParams = networkConstants.PARAMS;
  const networkLogo = networkConstants.ID_TO_LOGO;
  
  const menuItems = (
    networkIds.map((key, index) => {
      const logo = <img src={networkLogo[key]} style={{ 'width': '10%', paddingRight: '10px' }} />;
      return (
        <MenuItem
          key={index}
          className={styles.menuItem}
          onClick={(e) => {
            switchNetwork(library, key);
          }}
        >
          {logo}
          {networkParams[key].chainName}
        </MenuItem>
      );
    })
  );

  return (
    <Menu
      menuButton={
        <button className={styles.button}>
          {networkParams[networkId] ? networkParams[networkId].chainName : 'SWITCH CHAIN' }
        </button>}
      align="center"
      direction="bottom"
      position="anchor"
      menuClassName={styles.menu}
    >
      {menuItems}
    </Menu>
  );
}

export { NetworkDropDown };
