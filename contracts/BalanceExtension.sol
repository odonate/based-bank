// SPDX-License-Identifier: Apache-2.0
pragma solidity >=0.8.20;

import '@solady/auth/Ownable.sol';

struct Account {
    uint32 creditLimit;
    address product;
}

contract BalanceExtension is Ownable {

  mapping(address => Account) internal _accounts;

  constructor(MarketParameters memory parameters) {
    _initializeOwner(msg.sender);
  }
}
