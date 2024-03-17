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
    fromVenueId: deposit.fromVenueId,
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

// Ledger Services.

function listBalances(accountId) {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };
  const url = `${config.deflux_api}/v1/balances/list?account_ids=${accountId}`
  console.log(url);
  return fetchWithTimeout(url, requestOptions)
    .then(json => handleResponse(json, false))
    .then((response) => {
      console.log(response);
      return response.ledgerBalances;
    });
}

// Product Application Services.

function createProductApplication(application) {
  const body = JSON.stringify({
    productId: application.productId,
    accountId: application.accountId,
  })
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: body,
    timeout: 60000,
  };
  return fetchWithTimeout(`/${config.deflux_api}/v1/product-application/create`, requestOptions)
    .then(json => handleResponse(json, false))
    .then((response) => {
      console.log(response);
      return response;
    });
}

function getProductApplication(accountId) {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };
  const url = `${config.deflux_api}/v1/product-application/get?account_id=${accountId}`
  console.log(url);
  return fetchWithTimeout(url, requestOptions)
    .then(json => handleResponse(json, false))
    .then((response) => {
      console.log(response);
      return response;
    });
}

function listProductApplications() {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };
  return fetchWithTimeout(`${config.deflux_api}/v1/product-application/list`, requestOptions)
    .then(json => handleResponse(json, false))
    .then((response) => {
      console.log(response);
      return response.productApplications;
    });
}

export const defluxService = {
  createDeposit,
  createWithdrawal,
  listBalances,
  createProductApplication,
  getProductApplication,
  listProductApplications,
}
