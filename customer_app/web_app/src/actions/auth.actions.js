import { authConstants } from '../constants';
import { authService } from '../services';

function registerUser(email, username, password) {
  function success(register) {
    return { type: authConstants.REGISTER_USER_SUCCESS, register };
  }
  function failure(error) {
    return { type: authConstants.REGISTER_USER_FAILURE, error };
  }

  return (dispatch) => {
    authService.registerUser(email, username, password)
      .then(
	(register) => {
	  dispatch(success(register))
	},
	(error) => {
	  dispatch(failure(error.toString()));
	}
      );
  };
}

function clearLogin() {
  return { type: authConstants.LOGIN_USER_CLEAR }
}

function loginUser(username, password) {
  function success(login) {
    return { type: authConstants.LOGIN_USER_SUCCESS, login };
  }
  function failure(error) {
    return { type: authConstants.LOGIN_USER_FAILURE, error };
  }

  return (dispatch) => {
    authService.loginUser(username, password)
      .then(
	(login) => {
	  localStorage.setItem("login", JSON.stringify(login));
	  dispatch(success(login))
	},
	(error) => {
	  dispatch(failure(error.toString()));
	}
      );
  };
}

function getLogin() {
  function success(login) {
    return { type: authConstants.GET_LOGIN_SUCCESS, login };
  }
  return (dispatch) => {
    const cachedLogin = localStorage.getItem("login")
    if (cachedLogin) {
      const parsedLogin = JSON.parse(cachedLogin);
      dispatch(success(parsedLogin));
    }
  };
}

export const authActions = {
  registerUser,
  clearLogin,
  loginUser,
  getLogin,
}
