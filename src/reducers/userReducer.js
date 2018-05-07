import * as types from 'action_types/userActionTypes';
import initialState from './initialState';

const userReducer = (state = initialState.user, action) => {
  switch (action.type) {
    case types.LOAD_CURRENT_USER_SUCCESS:
      return {
        ...state,
        current: action.payload.user
      };

    default:
      return state;
  }
};

export default userReducer;
