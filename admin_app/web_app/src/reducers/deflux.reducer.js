import { combineReducers } from 'redux';

import { defluxConstants } from '../constants';

const evmProduct = (state = null, action) => {
  switch (action.type) {
    case defluxConstants.CREATE_EVM_PRODUCT_SUCCESS:
      return action;
    case defluxConstants.CREATE_EVM_PRODUCT_FAILURE:
      return state;
    case defluxConstants.CREATE_EVMP_RODUCTS_CLEAR:
      return null;
    default:
      return state;
  }
};

export const defluxServiceReducer = combineReducers({
  evmProduct,
});
