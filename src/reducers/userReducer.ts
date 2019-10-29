import helper from './reducerHelper';

import {LOAD_CURRENT_USER} from '../action_types/userActionTypes';
import initialState from './initialState';

const userReducer = (state = initialState.user, action) => {
  return helper.handleActions(state, action, {
    [LOAD_CURRENT_USER](state, payload) {
      state.current = payload.user;
    }
  });
};

export default userReducer;
