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

export const defluxActions = {
  createEvmProduct,
  listProductApplications,
}
