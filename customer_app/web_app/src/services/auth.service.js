import config from 'config';
import { handleResponse, fetchWithTimeout } from './utils.js';

function registerUser(email, username, password) {
  const profile = {
      email: email,
      username: username,
  };
  return Promise.resolve(profile);
  
  const body = JSON.stringify({
    profile: profile,
    password: password,
  });
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: body,
  };
  return fetchWithTimeout(`/${config.web_api}/v1/public/user`, requestOptions)
    .then(json => handleResponse(json, false))
    .then((response) => {
      return response;
    })
}

function loginUser(username, password) {
  const body = JSON.stringify({
    username: username,
    password: password,
  });
  return Promise.resolve({
    userId: "id",
    username: username,
  });
  
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: body,
  };
  return fetchWithTimeout(`/${config.web_api}/v1/public/session`, requestOptions)
    .then(json => handleResponse(json, false))
    .then((response) => {
      return response;
    });
}

function logoutUser(userId) {
  const body = JSON.stringify({
    userId: userId,
  });
  return Promise.resolve({});
  
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: body,
  };
  return fetchWithTimeout(`/${config.web_api}/v1/public/session:delete`, requestOptions)
    .then(json => handleResponse(json, false))
    .then((response) => {
      return response;
    });
}

export const authService = {
  registerUser,
  loginUser,
  logoutUser,
}
