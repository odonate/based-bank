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

export const defluxActions = {
  createEvmProduct,
}
