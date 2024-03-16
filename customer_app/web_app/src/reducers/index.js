import { combineReducers } from 'redux';

import { alert } from './alert.reducer';
import { authServiceReducer } from './auth.reducer';

const rootReducer = combineReducers({
  alert,
  authService: authServiceReducer,
});

export default rootReducer;
