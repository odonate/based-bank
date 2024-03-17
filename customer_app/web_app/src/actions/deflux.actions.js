import { alertConstants, defluxConstants } from '../constants';

import { defluxService } from '@services';
import { alertActions } from '.';

// EVM Payments Actions.
function createDeposit(deposit) {
  function success(deposit) {
    return { type: defluxConstants.CREATE_DEPOSIT_SUCCESS, deposit };
  }
  function failure(error) {
    return { type: defluxConstants.CREATE_DEPOSIT_FAILURE, error };
  }

  return (dispatch) => {
    defluxService.createDeposit(deposit)
      .then(
	(deposit) => dispatch(success(deposit)),
	(error) => dispatch(failure(error.toString()))
      );
  };
}

function createWithdrawal(withdrawal) {
  function success(withdrawal) {
    return { type: defluxConstants.CREATE_WITHDRAWAL_SUCCESS, withdrawal };
  }
  function failure(error) {
    return { type: defluxConstants.CREATE_WITHDRAWAL_FAILURE, error };
  }

  return (dispatch) => {
    defluxService.createWithdrawal(withdrawal)
      .then(
	(withdrawal) => dispatch(success(withdrawal)),
	(error) => dispatch(failure(error.toString()))
      );
  };
}

function listBalances(accountId) {
  function success(balances) {
    return { type: defluxConstants.LIST_BALANCES_SUCCESS, balances };
  }
  function failure(error) {
    return { type: defluxConstants.LIST_BALANCES_FAILURE, error };
  }

  return (dispatch) => {
    defluxService.listBalances(accountId)
      .then(
	(balances) => dispatch(success(balances)),
	(error) => dispatch(failure(error.toString()))
      );
  };
}


function createProductApplication(application) {
  function success(application) {
    return { type: defluxConstants.CREATE_PRODUCT_APPLICATION_SUCCESS, application };
  }
  function failure(error) {
    return { type: defluxConstants.CREATE_PRODUCT_APPLICATION_FAILURE, error };
  }

  return (dispatch) => {
    defluxService.createProductApplication(application)
      .then(
	(application) => dispatch(success(application)),
	(error) => dispatch(failure(error.toString()))
      );
  };
}

function getProductApplication(application) {
  function success(application) {
    return { type: defluxConstants.GET_PRODUCT_APPLICATION_SUCCESS, application };
  }
  function failure(error) {
    return { type: defluxConstants.GET_PRODUCT_APPLICATION_FAILURE, error };
  }

  return (dispatch) => {
    defluxService.getProductApplication(application)
      .then(
	(application) => dispatch(success(application)),
	(error) => dispatch(failure(error.toString()))
      );
  };
}

function listProductApplications(application) {
  function success(applications) {
    return { type: defluxConstants.LIST_PRODUCT_APPLICATION_SUCCESS, applications };
  }
  function failure(error) {
    return { type: defluxConstants.LIST_PRODUCT_APPLICATION_FAILURE, error };
  }

  return (dispatch) => {
    defluxService.listProductApplications(applications)
      .then(
	(applications) => dispatch(success(applications)),
	(error) => dispatch(failure(error.toString()))
      );
  };
}

export const defluxActions = {
  createDeposit,
  createWithdrawal,
  listBalances,
  createProductApplication,
  getProductApplication,
  listProductApplications,
}
