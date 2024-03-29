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

const productApplication = (state = null, action) => {
  switch (action.type) {
  case defluxConstants.EVALUATE_PRODUCT_APPLICATION_SUCCESS:
    return action;
  case defluxConstants.EVALUATE_PRODUCT_APPLICATION_FAILURE:
    return state;
  case defluxConstants.PRODUCT_APPLICATION_CLEAR:
    return null;
  default:
    return state;
  }
};

const productApplications = (state = [], action) => {
  switch (action.type) {
  case defluxConstants.LIST_PRODUCT_APPLICATIONS_SUCCESS:
    return action.applications;
  case defluxConstants.LIST_PRODUCT_APPLICATIONS_FAILURE:
    return state;
  case defluxConstants.PRODUCT_APPLICATIONS_CLEAR:
    return null;
  default:
    return state;
  }
};  

const balances = (state = [], action) => {
  switch (action.type) {
  case defluxConstants.LIST_BALANCES_SUCCESS:
      return action.balances;
    case defluxConstants.LIST_BALANCES_FAILURE:
      return state;
    case defluxConstants.LIST_BALANCES_CLEAR:
      return null;
    default:
      return state;
  }
};

export const defluxServiceReducer = combineReducers({
  evmProduct,
  productApplication,
  productApplications,
  balances,
});
