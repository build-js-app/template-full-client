import * as types from '../actions/actionTypes';
import initialState from './initialState';

const userReducer = (state = initialState.user, action) => {
  switch (action.type) {
    case types.LOAD_CURRENT_USER_SUCCESS:
      return {
        ...state,
        current: action.user
      };

    case types.LOAD_JSON_WEB_TOKEN: {
      return {
        ...state,
        token: action.token
      };
    }

    default:
      return state;
  }
};

export default userReducer;
