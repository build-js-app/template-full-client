import helper from './reducerHelper';

import * as actions from 'action_types/commonActionTypes';
import initialState from './initialState';

type CommonState = {
  asyncAction: object | null;
  confirmAction: object | null;
};

const commonReducer = (state: CommonState = initialState.common, action) => {
  return helper.handleActions(state, action, {
    [actions.ASYNC_ACTION_START](state, payload) {
      state.asyncAction = {showOverlay: payload.showOverlay};
    },
    [actions.ASYNC_ACTION_END](state) {
      state.asyncAction = null;
    },
    [actions.CONFIRM_ACTION](state, payload) {
      state.confirmAction = payload;
    },
    [actions.CONFIRM_ACTION_CANCEL](state) {
      state.confirmAction = null;
    }
  });
};

export default commonReducer;
