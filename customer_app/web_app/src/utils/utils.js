import React from 'react';
import BigNumber from 'bignumber.js';

import { networkConstants } from '../constants';
import ERC20TokenABI from '../utils/erc20TokenABI.json';
import NativeTokenABI from '../utils/nativeTokenABI.json';

const toHex = (num) => {
  const val = Number(num);
  return "0x" + val.toString(16);
};

const isZeroAddress = (address) => {
  const zeroAddressRegex = /^(0x)?0+$/i;
  return zeroAddressRegex.test(address);
};

export const isValidAddress = (address) => {
  const contractAddressRegex = /^0x[a-fA-F0-9]{40}$/;
  return contractAddressRegex.test(address);
}

export const shiftDecimals = (value, decimals) => {
  const decimalValue = new BigNumber(value);
  const factor = new BigNumber(10).pow(decimals);
  return decimalValue.times(factor).toFixed(0);
}

export const unshiftDecimals = (value, decimals) => {
  const decimalValue = new BigNumber(value);
  const factor = new BigNumber(10).pow(decimals);
  return decimalValue.dividedBy(factor).toString();
};

export const switchNetwork = async (library, networkId) => {
  const networkParams = networkConstants.PARAMS;
  try {
    return await library.currentProvider.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: toHex(networkId) }]
    })
  } catch (switchError) {
    if (switchError.code === 4902) {
      try {
	return await library.currentProvider.request({
	  method: "wallet_addEthereumChain",
	  params: [networkParams[networkId]]
	});
      } catch (error) {
	console.log(error);
	return error
      }
    }
    return switchError
  }
  return null;
};
