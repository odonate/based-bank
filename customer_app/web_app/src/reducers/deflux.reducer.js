import { combineReducers } from 'redux';

import { defluxConstants } from '../constants';

const deposit = (state = null, action) => {
  switch (action.type) {
    case defluxConstants.CREATE_DEPOSIT_SUCCESS:
      return action;
    case defluxConstants.CREATE_DEPOSIT_FAILURE:
      return state;
    case defluxConstants.CREATE_DEPOSITS_CLEAR:
      return null;
    default:
      return state;
  }
};

const withdrawal = (state = null, action) => {
  switch (action.type) {
    case defluxConstants.CREATE_WITHDRAWAL_SUCCESS:
      return action;
    case defluxConstants.CREATE_WITHDRAWAL_FAILURE:
      return state;
    case defluxConstants.CREATE_WITHDRAWALS_CLEAR:
      return null;
    default:
      return state;
  }
};

const balances = (state = null, action) => {
  switch (action.type) {
    case defluxConstants.LIST_BALANCES_SUCCESS:
      return action;
    case defluxConstants.LIST_BALANCES_FAILURE:
      return state;
    case defluxConstants.LIST_BALANCES_CLEAR:
      return null;
    default:
      return state;
  }
};

export const defluxServiceReducer = combineReducers({
  deposit,
  withdrawal,
  balances,
});
