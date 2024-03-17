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

function evaluateProductApplication(application) {
  const body = JSON.stringify({
    accountId: application.accountId,
    approve: application.approve,
  })
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: body,
    timeout: 60000,
  };
  return fetchWithTimeout(`/${config.deflux_api}/v1/product-application/evaluate`, requestOptions)
    .then(json => handleResponse(json, false))
    .then((response) => {
      console.log(response);
      return response;
    });
}

export const defluxService = {
  createEvmProduct,
  listProductApplications,
  evaluateProductApplication,
}
