import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { injected } from '../components/wallet';
import { useWeb3React } from '@web3-react/core';

import ERC20TokenABI from '../utils/erc20TokenABI.json';
import { isZeroAddress, isValidAddress } from './utils.js';

export const MetaMaskContext = React.createContext(null);

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const MetaMaskProvider = ({ children }) => {
  const {
    activate,
    account,
    chainId,
    library,
    connector,
    active,
    deactivate
  } = useWeb3React();

  const [networkId, setNetworkId] = useState(0);
  const [isActive, setIsActive] = useState(false);
  // const [isLoading, setIsLoading] = useState(true);
  // useEffect(() => {
  //   connect().then(() => {
  //     setIsLoading(false);
  //   });
  // }, []);
    
  const handleNetworkId = useCallback(() => {
    setNetworkId(chainId);
  }, [chainId]);
  useEffect(() => {
    handleNetworkId();
  }, [handleNetworkId]);
  
  const handleIsActive = useCallback(() => {
    setIsActive(active);
  }, [active]);
  useEffect(() => {
    handleIsActive();
  }, [handleIsActive]);

  // Connect to MetaMask wallet.
  const connect = async () => {
    console.log('Connecting to MetaMask Wallet');
    try {
      await activate(injected);
    } catch(error) {
      console.log('Error on connecting: ', error);
    }
  };

  // Disconnect from Metamask wallet.
  const disconnect = async () => {
    console.log('Deactivating...');
    try {
      await deactivate();
    } catch(error) {
      console.log('Error on disconnecting: ', error);
    }
  };

  // Retrieve balance of a token.
  const useTokenBalance = async (contractAddress) => {
    const [tokenBalance, setTokenBalance] = useState(0);
    if (isZeroAddress(contractAddress)) {
      const wei = await library.eth.getBalance(account);
      const balance = library.utils.fromWei(wei, "ether");
      setTokenBalance(balance);
    } else if (isValidAddress(contractAddress)) {
      const tokenContract = new library.eth.Contract(ERC20TokenABI.abi, contractAddress);
      const wei = await tokenContract.methods.balanceOf(account).call();
      const balance = library.utils.fromWei(wei, "ether");
      setTokenBalance(balance);
    }
    return tokenBalance;
  };

  // Retrieve the approved amount.
  const useApprovedAmount = (tokenAddress, spenderAddress) => {
    const [approvedAmount, setApprovedAmount] = useState(null);

    useEffect(() => {
      const fetchApprovalAmount = async () => {
        if (library && account) {
          try {
            const tokenContract = new library.eth.Contract(ERC20TokenABI.abi, tokenAddress);
            const amount = await tokenContract.methods.allowance(account, spenderAddress).call();
            setApprovedAmount(amount);
          } catch (error) {
            console.error("Error retrieving approval amount:", error);
          }
        }
      };
      fetchApprovalAmount();
    }, [library, account, tokenAddress, spenderAddress]);
    return { approvedAmount, setApprovedAmount };
  };

  const pollTransactionReceipt = async (transactionHash, interval = 1000, attempts = 60) => {
  let count = 0;

  while (count < attempts) {
    try {
      const receipt = await library.eth.getTransactionReceipt(transactionHash);
      if (receipt) {
        return receipt;
      }
      await delay(interval);
      count++;
    } catch (error) {
      console.error('Error polling for transaction receipt:', error);
      break;
    }
  }
  console.log(`Transaction receipt not found after ${attempts} attempts`);
  return null;
};

  // Create a token approval.
  const useTokenApproval = (tokenAddress) => {
    const [isApproving, setIsApproving] = useState(false);
    const [error, setError] = useState(null);

    const approveTokens = async (spender, amount) => {
      try {
        if (!library || !account) {
          throw new Error("Web3 library or account not available");
        }
        setIsApproving(true);
        const tokenContract = new library.eth.Contract(ERC20TokenABI.abi, tokenAddress);
        const approveData = tokenContract.methods.approve(spender, amount).encodeABI();
        // Slippage tolerace calculation: 0.5%
        const gasPrice = await library.eth.getGasPrice();
        return new Promise((resolve, reject) => {
          const approveTx = library.eth.sendTransaction({
            from: account,
            to: tokenAddress,
            data: approveData,
            gasPrice: gasPrice,
          }).on('transactionHash', function(hash) {
            console.log("Token approval successful");
            setIsApproving(false);
            resolve(hash);
          }).on('error', function(error){
            setError(error.message);
            setIsApproving(false);
            console.error("Token approval failed:", error);
            reject(error);
          });
        });
      } catch (error) {
        setIsApproving(false);
        setError(error.message);
        console.error("Token approval failed:", error);
        return error;
      }
    };
    return { isApproving, setIsApproving, error, approveTokens };
  };

  // Create native token transfer.
  const useNativeTokenTransfer = () => {
    const [isSending, setIsSending] = useState(false);
    const [error, setError] = useState(null);
    
    const nativeTransfer = async (toAddress, amount) => {
      try {
        setIsSending(true);
        if (!library  || !account) {
          throw new Error("Web3 library or account not available");
        }
        // Convert token value to wei
        const amountInWei = library.utils.toWei(amount.toString());
        const gasPrice = await library.eth.getGasPrice();
        // Send the transaction
        return new Promise((resolve, reject) => {
          const tx = library.eth.sendTransaction({
            from: account,
            to: toAddress,
            value: amountInWei,
            gasPrice: gasPrice,
          }).on('transactionHash', function(hash) {
            console.log("Native token transer successful");
            setIsSending(false);
            resolve(hash);
          }).on('error', function(error) {
            setError(error.message);
            console.error("Native token transfer failed:", error);
            setIsSending(false);
            reject(error);
          });
        });
      } catch (error) {
        setError(error.message);
        console.error("Native token transfer failed:", error);
        return error;
      }
    };
    return { isSending, setIsSending, error, nativeTransfer };
  };
  
  const values = useMemo(
    () => ({
      isActive,
      account,
      networkId,
      connect,
      disconnect,
      library,
      useApprovedAmount,
      useTokenApproval,
      useNativeTokenTransfer
    }),
    [isActive, networkId, account]
  );
  
  return (
    <MetaMaskContext.Provider value={values}>
      {children}
    </MetaMaskContext.Provider>
  );
};

export function useMetaMask() {
  const context = React.useContext(MetaMaskContext);

  if (context == undefined) {
    throw new Error('should never happen');
  }
  return context;
}
