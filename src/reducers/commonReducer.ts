import helper from './reducerHelper';

import {
  ASYNC_ACTION_START,
  ASYNC_ACTION_END,
  CONFIRM_ACTION,
  CONFIRM_ACTION_CANCEL
} from '../action_types/commonActionTypes';
import initialState from './initialState';

const commonReducer = (state = initialState.common, action) => {
  return helper.handleActions(state, action, {
    [ASYNC_ACTION_START](state, payload) {
      state.asyncAction = {showOverlay: payload.showOverlay};
    },
    [ASYNC_ACTION_END](state) {
      state.asyncAction = null;
    },
    [CONFIRM_ACTION](state, payload) {
      state.confirmAction = payload;
    },
    [CONFIRM_ACTION_CANCEL](state) {
      state.confirmAction = null;
    }
  });
};

export default commonReducer;
