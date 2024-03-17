import config from 'config';
import { handleResponse, fetchWithTimeout, urlEncodeFilter } from './utils.js';
import { v4 as uuidv4 } from 'uuid';

// EVM Payments Service
function createEvmProduct(evmProduct) {
  const body = JSON.stringify({
    evmProduct: {
      name: evmProduct.name,
      venueId: evmProduct.venueId,
    },
    annualInterestBips: evmProduct.annualInterest,
    reserveRatioBips: evmProduct.reserveRatio,
    balanceExtensionAddress: evmProduct.balanceExtensionAddress,
    tokenId: '0x75faf114eafb1bdbe2f0316df893fd58ce46aa4d',
  })
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: body,
    timeout: 60000,
  };
  return fetchWithTimeout(`/${config.deflux_api}/v1/evm-products`, requestOptions)
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

// Ledger Services.

function listBalances(accountIds) {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };

  // const url = `${config.deflux_api}/v1/balances/list?account_ids=${accountId}`
  const accountsQuery = accountIds.map(id => `account_ids=${id}`).join('&');
  const url = `${config.deflux_api}/v1/balances/list?${accountsQuery}`;
  console.log(url);
  return fetchWithTimeout(url, requestOptions)
    .then(json => handleResponse(json, false))
    .then((response) => {
      console.log(response);
      return response.ledgerBalances;
    });
}

export const defluxService = {
  createEvmProduct,
  listProductApplications,
  listBalances,
}
