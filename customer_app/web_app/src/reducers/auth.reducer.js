import { combineReducers } from 'redux';

import { authConstants } from '../constants';

const register = (state = null, action) => {
  switch (action.type) {
  case authConstants.REGISTER_USER_SUCCESS:
    return action.register;
  case authConstants.REGISTER_USER_FAILURE:
    return action.error;
  default:
    return state;
  }
};

const login = (state = null, action) => {
  switch (action.type) {
  case authConstants.LOGIN_USER_SUCCESS:
    return action.login;
  case authConstants.LOGIN_USER_FAILURE:
    return action.error;
  case authConstants.LOGIN_USER_CLEAR:
    return null;
  case authConstants.GET_LOGIN_SUCCESS:
    return action.login;
  default:
    return state;
  }
};

export const authServiceReducer = combineReducers({
  register,
  login,
});
