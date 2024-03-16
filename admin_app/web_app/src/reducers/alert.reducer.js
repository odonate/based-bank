import { alertConstants } from '../constants';

// Maybe make this a sort of queue system.
export function alert(state = null, action) {
  switch (action.type) {
    case alertConstants.SUCCESS:
      return {
        type: alertConstants.SUCCESS,
        alert: action.alert,
      };
    case alertConstants.ERROR:
      return {
        type: alertConstants.ERROR,
        alert: action.alert,
      };
    case alertConstants.CLEAR:
      return null;
    default:
      return state;
  }
}
