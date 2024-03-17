import { combineReducers } from 'redux';

import { alert } from './alert.reducer';
import { authServiceReducer } from './auth.reducer';
import { defluxServiceReducer } from './deflux.reducer';

const rootReducer = combineReducers({
  alert,
  authService: authServiceReducer,
  defluxService: defluxServiceReducer,
});

export default rootReducer;
