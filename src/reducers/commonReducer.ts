import helper from './reducerHelper';

import {
  ASYNC_ACTION_START,
  ASYNC_ACTION_END,
  CONFIRM_ACTION,
  CONFIRM_ACTION_CANCEL
} from '../action_types/commonActionTypes';
import initialState from './initialState';

const commonReducer = (state = initialState.common, action: any) => {
  return helper.handleActions(state, action, {
    [ASYNC_ACTION_START](state: any, payload: any) {
      state.asyncAction = {showOverlay: payload.showOverlay};
    },
    [ASYNC_ACTION_END](state: any) {
      state.asyncAction = null;
    },
    [CONFIRM_ACTION](state: any, payload: any) {
      state.confirmAction = payload;
    },
    [CONFIRM_ACTION_CANCEL](state: any) {
      state.confirmAction = null;
    }
  });
};

export default commonReducer;
