import config from 'config';
import { handleResponse, fetchWithTimeout, urlEncodeFilter } from './utils.js';
import { v4 as uuidv4 } from 'uuid';

// EVM Payments Service
function createDeposit(deposit) {
  const body = JSON.stringify({
    id: uuidv4(), // TODO MAKE UUID.
    accountId: deposit.accountId,
    tokenId: deposit.tokenId,
    amount: deposit.amount,
    fromAddress: deposit.fromAddress,
  })
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: body,
    timeout: 60000,
  };
  return fetchWithTimeout(`/${config.deflux_api}/v1/evm-payments/deposit`, requestOptions)
    .then(json => handleResponse(json, false))
    .then((response) => {
      console.log(response);
      return response;
    });
}

function createWithdrawal(withdrawal) {
  const body = JSON.stringify({
    id: uuidv4(), // TODO MAKE UUID.
    accountId: withdrawal.accountId,
    tokenId: withdrawal.tokenId,
    amount: withdrawal.amount,
    toAddress: withdrawal.toAddress,
    toVenueId: withdrawal.toVenueId,
  })
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: body,
    timeout: 60000,
  };
  return fetchWithTimeout(`${config.deflux_api}/v1/evm-payments/withdrawal`, requestOptions)
    .then(json => handleResponse(json, false))
    .then((response) => {
      return response;
    });
}

export const defluxService = {
  createDeposit,
  createWithdrawal,
}
