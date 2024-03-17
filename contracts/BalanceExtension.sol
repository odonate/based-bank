// SPDX-License-Identifier: Apache-2.0
pragma solidity >=0.8.20;

import '@solady/auth/Ownable.sol';

struct Account {
    uint32 creditLimit;
}

enum AccountInt32Param {
  Unknown,
  CreditLimit
}

contract BalanceExtension is Ownable {
    event DefluxAccountInt32ParamUpdated(address account, address product, AccountInt32Param key, int32 value);
	
  mapping(address => Account) internal _accounts;

  address _product;

  uint32 maxCreditLimit;

  constructor() {
    _initializeOwner(msg.sender);
      maxCreditLimit = 4294967295;
  }
  
  function init() external {
      if (_product != address(0)) {
	  revert("already initialised");
      }
      _product = msg.sender;
  }

  function setProduct(address product) external {
      if (_product != address(0)) {
	  revert("already initialised");
      }
      _product = product;
  }

  function canDebit(address account, uint256 balance, uint256 amount) external returns (bool) {
      if (balance + amount > _accounts[account].creditLimit) {
	  return false;
      }
      return true;
  }

  function setCreditLimit(address account, uint32 creditLimit) external onlyOwner {
      emit DefluxAccountInt32ParamUpdated(account, _product, AccountInt32Param.CreditLimit, int32(creditLimit));
      if (creditLimit > maxCreditLimit) {
	  revert("credit limit too high");
      }
      _accounts[account].creditLimit = creditLimit;
  }

  function setMaxCreditLimit(uint32 creditLimit) external onlyOwner {
      maxCreditLimit = creditLimit;
  }

}
