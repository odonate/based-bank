import { alertConstants, defluxConstants } from '../constants';

import { defluxService } from '@services';
import { alertActions } from '.';

// EVM Payments Actions.
function createEvmProduct(evmProduct) {
  function success(evmProduct) {
    return { type: defluxConstants.CREATE_EVM_PRODUCT_SUCCESS, evmProduct };
  }
  function failure(error) {
    return { type: defluxConstants.CREATE_EVM_PRODUCT_FAILURE, error };
  }

  return (dispatch) => {
    defluxService.createEvmProduct(evmProduct)
      .then(
	(evmProduct) => dispatch(success(evmProduct)),
	(error) => dispatch(failure(error.toString()))
      );
  };
}

function listProductApplications(applications) {
  function success(applications) {
    return { type: defluxConstants.LIST_PRODUCT_APPLICATIONS_SUCCESS, applications };
  }
  function failure(error) {
    return { type: defluxConstants.LIST_PRODUCT_APPLICATIONS_FAILURE, error };
  }

  return (dispatch) => {
    defluxService.listProductApplications(applications)
      .then(
	(applications) => dispatch(success(applications)),
	(error) => dispatch(failure(error.toString()))
      );
  };
}

function evaluateProductApplication(application) {
  function success(application) {
    return { type: defluxConstants.EVALUATE_PRODUCT_APPLICATION_SUCCESS, application };
  }
  function failure(error) {
    return { type: defluxConstants.EVALUATE_PRODUCT_APPLICATION_FAILURE, error };
  }

  return (dispatch) => {
    defluxService.evaluateProductApplication(application)
      .then(
	(application) => dispatch(success(application)),
	(error) => dispatch(failure(error.toString()))
      );
  };
}
function listBalances(accountIds) {
  function success(balances) {
    return { type: defluxConstants.LIST_BALANCES_SUCCESS, balances };
  }
  function failure(error) {
    return { type: defluxConstants.LIST_BALANCES_FAILURE, error };
  }

  return (dispatch) => {
    defluxService.listBalances(accountIds)
      .then(
	(balances) => dispatch(success(balances)),
	(error) => dispatch(failure(error.toString()))
      );
  };
}

export const defluxActions = {
  createEvmProduct,
  listProductApplications,
  evaluateProductApplication,
  listBalances,
}
