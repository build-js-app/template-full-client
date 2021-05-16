import helper from './reducerHelper';

import {LOAD_CURRENT_USER} from 'action_types/userActionTypes';
import initialState from './initialState';

export interface UserState {
  current?: User;
}

const userReducer = (state: UserState = initialState.user, action) => {
  return helper.handleActions(state, action, {
    [LOAD_CURRENT_USER](state, payload) {
      state.current = payload.user;
    }
  });
};

export default userReducer;
