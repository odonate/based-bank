// SPDX-License-Identifier: Apache-2.0
pragma solidity >=0.8.20;

import '@solady/auth/Ownable.sol';

struct Account {
    uint32 creditLimit;
}

contract BalanceExtension is Ownable {
  mapping(address => Account) internal _accounts;

  address product;

  uint32 maxCreditLimit;

  function init() external {
      if (product != address(0)) {
	  revert("already initialised");
      }
      product = msg.sender;
  }

  function canDebit(address account, uint256 balance, uint256 amount) external returns (bool) {
      if (balance + amount > _accounts[account].creditLimit) {
	  return false;
      }
      return true;
  }

  function setCreditLimit(address account, uint32 creditLimit) external onlyOwner {
      if (creditLimit > maxCreditLimit) {
	  revert("credit limit too high");
      }
      _accounts[account].creditLimit = creditLimit;
  }

  function setMaxCreditLimit(uint32 creditLimit) external onlyOwner {
      maxCreditLimit = creditLimit;
  }

  constructor() {
    _initializeOwner(msg.sender);
  }
}
